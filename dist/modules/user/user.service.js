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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const user_mapper_1 = require("./user.mapper");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('E-mail já cadastrado');
        }
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const user = await this.userRepository.create(createUserDto, hashedPassword);
        return user_mapper_1.UserMapper.toEntity(user);
    }
    async findAll(query) {
        const paginatedUsers = await this.userRepository.findAll(query);
        return {
            data: user_mapper_1.UserMapper.toEntityList(paginatedUsers.data),
            meta: paginatedUsers.meta,
        };
    }
    async findById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user_mapper_1.UserMapper.toEntity(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user_mapper_1.UserMapper.toEntity(user);
    }
    async findByEmailWithPassword(email) {
        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user) {
            return null;
        }
        return user;
    }
    async update(id, updateUserDto) {
        await this.findById(id);
        if (updateUserDto.email) {
            const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException('E-mail já cadastrado');
            }
        }
        const updatedUser = await this.userRepository.update(id, updateUserDto);
        return user_mapper_1.UserMapper.toEntity(updatedUser);
    }
    async changePassword(id, changePasswordDto) {
        const user = await this.userRepository.findByIdWithPassword(id);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const isPasswordMatching = await bcrypt.compare(changePasswordDto.currentPassword, user.hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Senha atual incorreta');
        }
        const newHashedPassword = await this.hashPassword(changePasswordDto.newPassword);
        await this.userRepository.updatePassword(id, newHashedPassword);
    }
    async remove(id) {
        await this.findById(id);
        await this.userRepository.remove(id);
    }
    async forceSetPassword(id, newPassword) {
        const newHashedPassword = await this.hashPassword(newPassword);
        await this.userRepository.updatePassword(id, newHashedPassword);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map