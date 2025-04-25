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
var MercadoPagoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoService = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("../reservations/reservations.service");
const reservation_status_enum_1 = require("../../common/enums/reservation-status.enum");
const payment_repository_1 = require("./payment.repository");
const prisma_service_1 = require("../../prisma/prisma.service");
const mercado_pago_messages_1 = require("../../common/errorMessages/mercado-pago-messages");
let MercadoPagoService = MercadoPagoService_1 = class MercadoPagoService {
    constructor(reservationService, prisma, paymentRepository) {
        this.reservationService = reservationService;
        this.prisma = prisma;
        this.paymentRepository = paymentRepository;
        this.logger = new common_1.Logger(MercadoPagoService_1.name);
    }
    async createUrlPayment(price, reservationId) {
        await this.checkReservation(reservationId);
        const result = await fetch(process.env.CHECKOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                notification_url: `${process.env.APP_BASE_URL.length > 0 ? process.env.APP_BASE_URL : process.env.ULR_MP_DESARROLLO}/api/v1/payment/notification`,
                external_reference: reservationId,
                items: [
                    {
                        title: 'Reserva Camping',
                        quantity: 1,
                        currency_id: 'ARS',
                        unit_price: price,
                    },
                ],
            }),
        });
        const response = await result.json();
        this.logger.log('Payment URL generated:', response);
        return response;
    }
    async paymentAccredited(paymentId) {
        const { external_reference, status, status_detail, ...rest } = await this.getPaymentData(paymentId);
        if (status !== 'approved' || status_detail !== 'accredited') {
            throw new common_1.BadRequestException('Ocurrio algun error con la verificacion del pago');
        }
        const transaction = await this.prisma.$transaction(async () => {
            const reservation = await this.reservationService.update(+external_reference, {
                status: reservation_status_enum_1.RESERVATION_STATUS.CONFIRMED,
            });
            const startReservation = new Date(reservation.startDate);
            startReservation.setDate(startReservation.getDate() - 1);
            await this.paymentRepository.create({
                amount: rest.transaction_amount,
                externalPaymentId: paymentId,
                reservationId: +external_reference,
                limitDateRefound: startReservation,
            });
            return { reservation };
        });
        this.logger.log('Payment accredited:', transaction);
        return transaction.reservation;
    }
    async paymentRefound(reservationId) {
        const payment = await this.paymentRepository.findFirst(reservationId);
        if (!payment)
            throw new common_1.NotFoundException('pago de reservacion no encontrado');
        if (!this.checkIsPossibleRefound({ limitDateRefound: payment.limitDateRefound })) {
            throw new common_1.BadRequestException('Se Excedio la fecha limite de reembolso');
        }
        const result = await fetch(`https://api.mercadopago.com/v1/payments/${payment.externalPaymentId}/refunds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Idempotency-Key': crypto.randomUUID(),
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        if (result.ok && result.status === 201) {
            await this.paymentRepository.delete(payment.id);
            await this.reservationService.update(reservationId, { status: reservation_status_enum_1.RESERVATION_STATUS.CANCELLED });
        }
    }
    async getPaymentData(paymentId) {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });
        return await response.json();
    }
    async checkReservation(id) {
        const reservation = await this.reservationService.findOne(id);
        if (!reservation) {
            throw new common_1.BadRequestException();
        }
        if (reservation.status !== reservation_status_enum_1.RESERVATION_STATUS.PENDING) {
            throw new common_1.BadRequestException(mercado_pago_messages_1.MP_ERROR_MESSAGES.STATUS_PENDING);
        }
    }
    checkIsPossibleRefound({ limitDateRefound }) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const limitDate = new Date(limitDateRefound);
        limitDate.setHours(0, 0, 0, 0);
        console.log(today, limitDate);
        return today < limitDate;
    }
};
exports.MercadoPagoService = MercadoPagoService;
exports.MercadoPagoService = MercadoPagoService = MercadoPagoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService,
        prisma_service_1.PrismaService,
        payment_repository_1.PaymentRepository])
], MercadoPagoService);
//# sourceMappingURL=mercado-pago.service.js.map