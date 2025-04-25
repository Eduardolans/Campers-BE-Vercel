import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
