import { Reservation } from '@prisma/client';
export declare class CreateReservationDto implements Omit<Reservation, 'id' | 'createdAt' | 'updatedAt' | 'cancelledAt' | 'status'> {
    userId: string;
    campingId: number;
    peopleCount: number;
    tentsCount: number;
    startDate: Date;
    endDate: Date;
}
