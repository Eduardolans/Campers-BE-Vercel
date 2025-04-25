import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }>;
    findByCampingId(id: number): Promise<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }[]>;
    GetOccupancy(id: number, startDate: string, endDate: string): Promise<{
        [k: string]: {
            people: number;
            tents: number;
        };
    }>;
    update(id: number, updateReservationDto: UpdateReservationDto): import(".prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        campingId: number;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
