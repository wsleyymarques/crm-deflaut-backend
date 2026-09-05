"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserRoleRepository = class UserRoleRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserRoleDto) {
        return this.prisma.userRole.create({
            data: createUserRoleDto,
        });
    }
    async findRolesByUserId(userId) {
        return this.prisma.userRole.findMany({
            where: { userId },
            include: {
                role: true,
            },
        });
    }
    async findByUserIdAndRoleId(userId, roleId) {
        return this.prisma.userRole.findUnique({
            where: {
                userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });
    }
    async findUserRolesByUserId(userId) {
        return this.prisma.userRole.findMany({
            where: { userId },
        });
    }
    async findById(id) {
        return this.prisma.userRole.findUnique({
            where: { id },
        });
    }
    async remove(id) {
        await this.prisma.userRole.delete({
            where: { id },
        });
    }
};
exports.UserRoleRepository = UserRoleRepository;
exports.UserRoleRepository = UserRoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRoleRepository);
//# sourceMappingURL=user-role.repository.js.map