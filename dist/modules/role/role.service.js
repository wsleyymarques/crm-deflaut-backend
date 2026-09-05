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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_mapper_1 = require("./role.mapper");
const role_repository_1 = require("./role.repository");
let RoleService = class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(createRoleDto) {
        const existingRole = await this.roleRepository.findByName(createRoleDto.name);
        if (existingRole) {
            throw new common_1.ConflictException('Já existe um perfil com este nome.');
        }
        const role = await this.roleRepository.create(createRoleDto);
        return role_mapper_1.RoleMapper.toEntity(role);
    }
    async findAll(query) {
        const paginatedRoles = await this.roleRepository.findAll(query);
        return {
            data: role_mapper_1.RoleMapper.toEntityList(paginatedRoles.data),
            meta: paginatedRoles.meta,
        };
    }
    async findById(id) {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new common_1.NotFoundException('Perfil não encontrado.');
        }
        return role_mapper_1.RoleMapper.toEntity(role);
    }
    async update(id, updateRoleDto) {
        await this.findById(id);
        if (updateRoleDto.name) {
            const existingRole = await this.roleRepository.findByName(updateRoleDto.name);
            if (existingRole && existingRole.id !== id) {
                throw new common_1.ConflictException('Já existe um perfil com este nome.');
            }
        }
        const role = await this.roleRepository.update(id, updateRoleDto);
        return role_mapper_1.RoleMapper.toEntity(role);
    }
    async remove(id) {
        await this.findById(id);
        await this.roleRepository.remove(id);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleService);
//# sourceMappingURL=role.service.js.map