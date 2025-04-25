import { Reservation } from '@prisma/client';
import { Server } from 'socket.io';
export declare class CampingGateway {
    server: Server;
    notifyNewCamping(camping: any): void;
    notifyReservationPayment(reservation: Reservation): void;
}
