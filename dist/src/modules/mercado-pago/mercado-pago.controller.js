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
exports.MercadoPagoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const mercado_pago_service_1 = require("./mercado-pago.service");
const camping_gateway_1 = require("../webSockets/camping.gateway");
const refound_payment_dto_1 = require("./dto/refound-payment.dto");
let MercadoPagoController = class MercadoPagoController {
    constructor(mercadoPagoService, campingGateway) {
        this.mercadoPagoService = mercadoPagoService;
        this.campingGateway = campingGateway;
    }
    async createUrlPayment(price, reservationId, res) {
        if (price <= 0 || reservationId < 0) {
            throw new common_1.BadRequestException('price or reservationId must be greater than 0');
        }
        const result = await this.mercadoPagoService.createUrlPayment(price, reservationId);
        return res.status(200).json({ url: result.init_point });
    }
    async notificationPayment(req, notification, res) {
        if (notification.action === 'payment.created') {
            this.mercadoPagoService.paymentAccredited(notification.data.id).then((data) => {
                if (data) {
                    this.campingGateway.notifyReservationPayment(data);
                }
            });
        }
        return res.status(200).json({ message: 'OK' });
    }
    async paymentRefound(body) {
        await this.mercadoPagoService.paymentRefound(body.reservationId);
    }
};
exports.MercadoPagoController = MercadoPagoController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('price', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('reservationId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "createUrlPayment", null);
__decorate([
    (0, common_1.Post)('notification'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "notificationPayment", null);
__decorate([
    (0, common_1.Post)('refound'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refound_payment_dto_1.RefoundPaymentDto]),
    __metadata("design:returntype", Promise)
], MercadoPagoController.prototype, "paymentRefound", null);
exports.MercadoPagoController = MercadoPagoController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [mercado_pago_service_1.MercadoPagoService,
        camping_gateway_1.CampingGateway])
], MercadoPagoController);
//# sourceMappingURL=mercado-pago.controller.js.map