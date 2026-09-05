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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("../role/role.service");
const user_service_1 = require("../user/user.service");
const user_role_mapper_1 = require("./user-role.mapper");
const user_role_repository_1 = require("./user-role.repository");
let UserRoleService = class UserRoleService {
    userRoleRepository;
    userService;
    roleService;
    constructor(userRoleRepository, userService, roleService) {
        this.userRoleRepository = userRoleRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    async create(createUserRoleDto) {
        await this.userService.findById(createUserRoleDto.userId);
        await this.roleService.findById(createUserRoleDto.roleId);
        const existing = await this.userRoleRepository.findByUserIdAndRoleId(createUserRoleDto.userId, createUserRoleDto.roleId);
        if (existing) {
            throw new common_1.ConflictException('Este perfil já foi atribuído a este usuário.');
        }
        const userRole = await this.userRoleRepository.create(createUserRoleDto);
        return user_role_mapper_1.UserRoleMapper.toEntity(userRole);
    }
    async findUserRolesByUserId(userId) {
        await this.userService.findById(userId);
        const userRoles = await this.userRoleRepository.findUserRolesByUserId(userId);
        return user_role_mapper_1.UserRoleMapper.toEntityList(userRoles);
    }
    async remove(id) {
        const userRole = await this.userRoleRepository.findById(id);
        if (!userRole) {
            throw new common_1.NotFoundException('Relação perfil-usuário não encontrada.');
        }
        await this.userRoleRepository.remove(id);
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_role_repository_1.UserRoleRepository,
        user_service_1.UserService,
        role_service_1.RoleService])
], UserRoleService);
//# sourceMappingURL=user-role.service.js.map