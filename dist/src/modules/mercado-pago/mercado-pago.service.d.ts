import { ReservationsService } from '../reservations/reservations.service';
import { Reservation } from '@prisma/client';
import { PaymentRepository } from './payment.repository';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class MercadoPagoService {
    private readonly reservationService;
    private readonly prisma;
    private readonly paymentRepository;
    private readonly logger;
    constructor(reservationService: ReservationsService, prisma: PrismaService, paymentRepository: PaymentRepository);
    createUrlPayment(price: number, reservationId: number): Promise<any>;
    paymentAccredited(paymentId: string): Promise<Reservation>;
    paymentRefound(reservationId: number): Promise<void>;
    private getPaymentData;
    private checkReservation;
    private checkIsPossibleRefound;
}
