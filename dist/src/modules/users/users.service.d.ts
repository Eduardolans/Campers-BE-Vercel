import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string | null;
        email: string;
        owner: boolean;
    }[]>;
    findById(id: string): Promise<{
        campings: {
            id: number;
            name: string;
            description: string;
            contactPhone: string;
            userId: string;
            locationId: number;
            limitCampingId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        id: string;
        name: string | null;
        email: string;
        owner: boolean;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string;
        owner: boolean;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        owner: boolean;
    }>;
}
