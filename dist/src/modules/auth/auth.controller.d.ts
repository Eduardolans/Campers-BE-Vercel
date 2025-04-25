import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: UserCreateDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string;
        owner: boolean;
    }>;
    LogIn(data: LoginRequestDto): Promise<{
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
}
