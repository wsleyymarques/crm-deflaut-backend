import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { MailService } from '../../common/mail/mail.service';
import { UserService } from '../user/user.service';
import { UserRoleRepository } from '../user-role/user-role.repository';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordResetCodeRepository } from './password-reset-code.repository';
import { RefreshTokenRepository } from './refresh-token.repository';
export declare class AuthService {
    private readonly userService;
    private readonly userRoleRepository;
    private readonly refreshTokenRepository;
    private readonly passwordResetCodeRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly mailService;
    private static readonly FIXED_CODE_ALLOWED_ENVS;
    constructor(userService: UserService, userRoleRepository: UserRoleRepository, refreshTokenRepository: RefreshTokenRepository, passwordResetCodeRepository: PasswordResetCodeRepository, jwtService: JwtService, configService: ConfigService, mailService: MailService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        usuario: import("../user/entities/user.entity").UserEntity;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    private generateAccessToken;
    private generateRefreshToken;
    private hashToken;
    private generateResetCode;
}
