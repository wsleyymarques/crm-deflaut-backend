import { ApiResponse } from '../../common/responses/api-response';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<ApiResponse<{
        accessToken: string;
        refreshToken: string;
        usuario: import("../user/entities/user.entity").UserEntity;
    }>>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<ApiResponse<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(user: JwtPayload): Promise<ApiResponse<unknown>>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<ApiResponse<unknown>>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ApiResponse<unknown>>;
}
