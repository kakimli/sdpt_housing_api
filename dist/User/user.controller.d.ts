import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(loginDto: LoginDto, session: Record<string, any>): Promise<number | {
        success: boolean;
        msg: any;
    }>;
    checkLoginState(session: Record<string, any>): Promise<{
        success: boolean;
        data: {};
        msg?: undefined;
    } | {
        success: boolean;
        msg: any;
        data?: undefined;
    }>;
}
