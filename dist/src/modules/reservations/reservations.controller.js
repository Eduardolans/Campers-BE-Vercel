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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const update_reservation_dto_1 = require("./dto/update-reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_guard_1 = require("../../guards/auth-guard.guard");
let ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    async create(createReservationDto) {
        return await this.reservationsService.create(createReservationDto);
    }
    findAll() {
        return this.reservationsService.findAll();
    }
    async findOne(id) {
        const result = await this.reservationsService.findOne(+id);
        if (!result)
            throw new common_1.NotFoundException();
        return result;
    }
    findByCampingId(id) {
        return this.reservationsService.findByCampingId(+id);
    }
    async GetOccupancy(id, startDate, endDate) {
        const result = await this.reservationsService.availabilityPerDay({ campingId: +id, startDate, endDate });
        return Object.fromEntries(result);
    }
    update(id, updateReservationDto) {
        return this.reservationsService.update(+id, updateReservationDto);
    }
    remove(id) {
        return this.reservationsService.remove(+id);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Get)('campingId/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "findByCampingId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Get)('campingId/:id/occupancy'),
    (0, swagger_1.ApiQuery)({
        name: 'start',
        type: String,
        format: 'date',
        description: 'Fecha de inicio (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'end',
        type: String,
        format: 'date',
        description: 'Fecha de fin (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiOperation)({
        description: 'Devuelve la cantidad total de personas y carpas por día en los cuales hay alguna reserva en el camping, entre dos fechas dadas.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "GetOccupancy", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_reservation_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "remove", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)('reservations'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map