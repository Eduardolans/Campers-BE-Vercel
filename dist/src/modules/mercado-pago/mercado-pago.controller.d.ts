import { MercadoPagoService } from './mercado-pago.service';
import { Request, Response } from 'express';
import { NotificationMPType } from 'src/common/types/mercadoPago/notification';
import { CampingGateway } from '../webSockets/camping.gateway';
import { RefoundPaymentDto } from './dto/refound-payment.dto';
export declare class MercadoPagoController {
    private readonly mercadoPagoService;
    private readonly campingGateway;
    constructor(mercadoPagoService: MercadoPagoService, campingGateway: CampingGateway);
    createUrlPayment(price: number, reservationId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    notificationPayment(req: Request, notification: NotificationMPType, res: Response): Promise<Response<any, Record<string, any>>>;
    paymentRefound(body: RefoundPaymentDto): Promise<void>;
}
