import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reservation } from '@prisma/client';
import { Cache } from 'cache-manager';
interface ReservationDataType {
    campingId: number;
    startDate: string;
    endDate: string;
    peopleCount: number;
    tentsCount: number;
}
export declare class ReservationsService {
    private readonly prisma;
    private cacheManager;
    private readonly cachePrefixKey;
    private readonly logger;
    constructor(prisma: PrismaService, cacheManager: Cache);
    create(createReservationDto: CreateReservationDto): Promise<{
        id: number;
        userId: string;
        campingId: number;
        createdAt: Date;
        updatedAt: Date;
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
        campingId: number;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }[]>;
    findOne(id: number): Promise<Reservation | null>;
    findByCampingId(campingId: number): Promise<Reservation[]>;
    update(id: number, updateReservationDto: UpdateReservationDto): import(".prisma/client").Prisma.Prisma__ReservationClient<{
        id: number;
        userId: string;
        campingId: number;
        createdAt: Date;
        updatedAt: Date;
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
        campingId: number;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        peopleCount: number;
        tentsCount: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        cancelledAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    private findByPeriodTime;
    availabilityPerDay(data: Pick<ReservationDataType, 'endDate' | 'startDate' | 'campingId'>): Promise<Map<string, {
        people: number;
        tents: number;
    }>>;
    private checkAvailability;
    private checkDates;
}
export {};
