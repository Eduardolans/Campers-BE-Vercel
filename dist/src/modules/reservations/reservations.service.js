"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReservationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const reservation_status_enum_1 = require("../../common/enums/reservation-status.enum");
const reservations_error_messages_1 = require("../../common/errorMessages/reservations-error-messages");
let ReservationsService = ReservationsService_1 = class ReservationsService {
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
        this.cachePrefixKey = 'reservations:';
        this.logger = new common_1.Logger(ReservationsService_1.name);
    }
    async create(createReservationDto) {
        const { campingId, startDate, endDate, peopleCount, tentsCount } = createReservationDto;
        const setStartDate = new Date(startDate).toISOString();
        const setEndDate = new Date(endDate).toISOString();
        this.checkDates(setStartDate, setEndDate);
        const { limitCamping } = await this.prisma.camping.findFirstOrThrow({
            where: {
                id: campingId,
            },
            select: {
                limitCamping: {
                    select: {
                        maxTents: true,
                        maxUsers: true,
                    },
                },
            },
        });
        if (tentsCount > limitCamping.maxTents || peopleCount > limitCamping.maxUsers) {
            throw new common_1.UnprocessableEntityException(reservations_error_messages_1.RESERVATION_ERROR_MESSAGES.LIMIT_EXCEEDED);
        }
        const availability = await this.checkAvailability({
            campingId,
            startDate: setStartDate,
            endDate: setEndDate,
            peopleCount,
            tentsCount,
            limitCamping,
        });
        if (!availability) {
            throw new common_1.UnprocessableEntityException('La reserva supera el límite de carpas o personas permitidas en alguna de las fechas seleccionadas.');
        }
        this.cacheManager.del(`${this.cachePrefixKey}${campingId}`);
        this.logger.log(`Reservation created: ${createReservationDto.campingId}`);
        return this.prisma.reservation.create({
            data: {
                ...createReservationDto,
                startDate: setStartDate,
                endDate: setEndDate,
                status: reservation_status_enum_1.RESERVATION_STATUS.PENDING,
            },
        });
    }
    findAll() {
        return this.prisma.reservation.findMany();
    }
    async findOne(id) {
        return await this.prisma.reservation.findFirst({ where: { id } });
    }
    async findByCampingId(campingId) {
        const resultCache = await this.cacheManager.get(`${this.cachePrefixKey}${campingId}`);
        if (resultCache) {
            return resultCache;
        }
        const response = await this.prisma.reservation.findMany({ where: { campingId: campingId } });
        await this.cacheManager.set(`${this.cachePrefixKey}${campingId}`, response);
        return response;
    }
    update(id, updateReservationDto) {
        return this.prisma.reservation.update({ data: updateReservationDto, where: { id } });
    }
    remove(id) {
        return this.prisma.reservation.delete({ where: { id } });
    }
    findByPeriodTime({ startDate, endDate, campingId, }) {
        return this.prisma.reservation.findMany({
            where: {
                campingId,
                startDate: {
                    lte: new Date(endDate).toISOString(),
                },
                endDate: {
                    gte: new Date(startDate).toISOString(),
                },
                status: {
                    not: reservation_status_enum_1.RESERVATION_STATUS.CANCELLED,
                },
            },
        });
    }
    async availabilityPerDay(data) {
        const reservationsBetween = await this.findByPeriodTime(data);
        const dateMap = new Map();
        reservationsBetween.forEach((reservation) => {
            const curr = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);
            while (curr <= end) {
                if (curr >= new Date(data.startDate) && curr <= new Date(data.endDate)) {
                    const key = curr.toISOString().split('T')[0];
                    const totals = dateMap.get(key) || { people: 0, tents: 0 };
                    totals.people += reservation.peopleCount;
                    totals.tents += reservation.tentsCount;
                    dateMap.set(key, totals);
                }
                curr.setDate(curr.getDate() + 1);
            }
        });
        this.logger.log(`Availability per day for camping ${data.campingId}:`, dateMap);
        return dateMap;
    }
    async checkAvailability(data) {
        const { limitCamping, ...restData } = data;
        const availabilityPerDay = await this.availabilityPerDay(restData);
        for (const [key] of availabilityPerDay) {
            const valueMap = availabilityPerDay.get(key);
            if (valueMap.tents + data.tentsCount > limitCamping.maxTents ||
                valueMap.people + data.peopleCount > limitCamping.maxUsers) {
                return false;
            }
        }
        return true;
    }
    checkDates(start, end) {
        if (start >= end) {
            throw new common_1.UnprocessableEntityException(reservations_error_messages_1.RESERVATION_ERROR_MESSAGES.END_DATE_INVALID);
        }
        if (start.split('T')[0] < new Date().toISOString().split('T')[0]) {
            throw new common_1.UnprocessableEntityException(reservations_error_messages_1.RESERVATION_ERROR_MESSAGES.PAST_DAY);
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = ReservationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map