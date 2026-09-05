"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const mail_service_1 = require("../../common/mail/mail.service");
const user_mapper_1 = require("../user/user.mapper");
const user_service_1 = require("../user/user.service");
const user_role_repository_1 = require("../user-role/user-role.repository");
function addMinutes(date, minutes) {
    const next = new Date(date);
    next.setMinutes(next.getMinutes() + minutes);
    return next;
}
const password_reset_code_repository_1 = require("./password-reset-code.repository");
const refresh_token_repository_1 = require("./refresh-token.repository");
let AuthService = class AuthService {
    static { AuthService_1 = this; }
    userService;
    userRoleRepository;
    refreshTokenRepository;
    passwordResetCodeRepository;
    jwtService;
    configService;
    mailService;
    static FIXED_CODE_ALLOWED_ENVS = ['development', 'test'];
    constructor(userService, userRoleRepository, refreshTokenRepository, passwordResetCodeRepository, jwtService, configService, mailService) {
        this.userService = userService;
        this.userRoleRepository = userRoleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordResetCodeRepository = passwordResetCodeRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
    }
    async login(loginDto) {
        const user = await this.userService.findByEmailWithPassword(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const isPasswordMatching = await bcrypt.compare(loginDto.password, user.hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const userRoles = await this.userRoleRepository.findRolesByUserId(user.id);
        const roles = userRoles.map((ur) => ur.role.name);
        const accessToken = await this.generateAccessToken(user.id, user.email, roles);
        const refreshToken = await this.generateRefreshToken(user.id);
        return {
            accessToken,
            refreshToken: refreshToken.token,
            usuario: user_mapper_1.UserMapper.toEntity(user),
        };
    }
    async refresh(refreshTokenDto) {
        const tokenHash = this.hashToken(refreshTokenDto.refreshToken);
        const rt = await this.refreshTokenRepository.findByTokenHash(tokenHash);
        if (!rt || new Date() > rt.expiresAt) {
            throw new common_1.UnauthorizedException('Token inválido ou expirado');
        }
        const user = await this.userService.findById(rt.userId);
        if (!user) {
            await this.refreshTokenRepository.delete(rt.id);
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        await this.refreshTokenRepository.delete(rt.id);
        const userRoles = await this.userRoleRepository.findRolesByUserId(user.id);
        const roles = userRoles.map((ur) => ur.role.name);
        const newAccessToken = await this.generateAccessToken(user.id, user.email, roles);
        const newRefreshToken = await this.generateRefreshToken(user.id);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken.token,
        };
    }
    async logout(userId) {
        await this.refreshTokenRepository.deleteAllByUserId(userId);
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.userService.findByEmail(forgotPasswordDto.email);
        if (user) {
            await this.passwordResetCodeRepository.deleteAllByUserId(user.id);
            const code = this.generateResetCode();
            const codeHash = await bcrypt.hash(code, 10);
            const expiresAt = addMinutes(new Date(), this.configService.get('RESET_CODE_EXPIRES_IN_MINUTES', 15));
            await this.passwordResetCodeRepository.create(codeHash, user.id, expiresAt);
            await this.mailService.sendPasswordResetCode(user.email, code);
        }
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.userService.findByEmail(resetPasswordDto.email);
        if (!user) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const resetCode = await this.passwordResetCodeRepository.findLatestByUserId(user.id);
        const maxAttempts = this.configService.get('RESET_CODE_MAX_ATTEMPTS', 5);
        if (!resetCode ||
            new Date() > resetCode.expiresAt ||
            resetCode.attempts >= maxAttempts) {
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        const isCodeMatching = await bcrypt.compare(resetPasswordDto.code, resetCode.codeHash);
        if (!isCodeMatching) {
            await this.passwordResetCodeRepository.incrementAttempts(resetCode.id);
            throw new common_1.BadRequestException('Código inválido ou expirado');
        }
        await this.userService.forceSetPassword(user.id, resetPasswordDto.newPassword);
        await this.passwordResetCodeRepository.delete(resetCode.id);
        await this.refreshTokenRepository.deleteAllByUserId(user.id);
    }
    async generateAccessToken(userId, email, roles) {
        const payload = { sub: userId, email, roles };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET', 'dev-secret'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m'),
        });
    }
    async generateRefreshToken(userId) {
        const token = crypto.randomBytes(48).toString('hex');
        const hash = this.hashToken(token);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.configService.get('REFRESH_TOKEN_EXPIRES_IN_DAYS', 7));
        await this.refreshTokenRepository.create(hash, userId, expiresAt);
        return { token, hash };
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    generateResetCode() {
        const fixedEnabled = this.configService.get('AUTH_FIXED_RESET_CODE_ENABLED') === 'true';
        const currentEnv = this.configService.get('NODE_ENV');
        const envAllowsFixedCode = currentEnv
            ? AuthService_1.FIXED_CODE_ALLOWED_ENVS.includes(currentEnv)
            : false;
        if (fixedEnabled && envAllowsFixedCode) {
            return this.configService.get('AUTH_FIXED_RESET_CODE', '123456');
        }
        return crypto.randomInt(100000, 999999).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)(mail_service_1.MAIL_SERVICE)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_role_repository_1.UserRoleRepository,
        refresh_token_repository_1.RefreshTokenRepository,
        password_reset_code_repository_1.PasswordResetCodeRepository,
        jwt_1.JwtService,
        config_1.ConfigService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map