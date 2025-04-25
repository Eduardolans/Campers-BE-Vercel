import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: UserCreateDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string;
        owner: boolean;
    }>;
    logIn(data: LoginRequestDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
            password: string;
        };
        email: string;
        token: string;
        owner: boolean;
    }>;
    catch(error: any): void;
}
