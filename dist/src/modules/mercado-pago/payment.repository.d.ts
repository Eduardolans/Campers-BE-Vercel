import { Payment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<Payment, 'id' | 'payerEmail' | 'statusDetail'>): Promise<void>;
    delete(id: number): Promise<void>;
    findFirst(reservationId: number): Promise<Payment | null>;
}
