"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPreferenceDTO = exports.CreatePaymentPreferenceDTO = void 0;
const openapi = require("@nestjs/swagger");
class CreatePaymentPreferenceDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { reservationId: { required: true, type: () => String }, amount: { required: true, type: () => Number }, description: { required: true, type: () => String } };
    }
}
exports.CreatePaymentPreferenceDTO = CreatePaymentPreferenceDTO;
class PaymentPreferenceDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { preferenceId: { required: true, type: () => String }, paymentUrl: { required: true, type: () => String } };
    }
}
exports.PaymentPreferenceDTO = PaymentPreferenceDTO;
//# sourceMappingURL=create-mercado-pago.dto.js.map