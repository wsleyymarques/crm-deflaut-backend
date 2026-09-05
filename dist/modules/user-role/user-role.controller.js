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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
const api_response_1 = require("../../common/responses/api-response");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_user_role_dto_1 = require("./dto/create-user-role.dto");
const user_role_service_1 = require("./user-role.service");
let UserRoleController = class UserRoleController {
    userRoleService;
    constructor(userRoleService) {
        this.userRoleService = userRoleService;
    }
    async create(createUserRoleDto) {
        const userRole = await this.userRoleService.create(createUserRoleDto);
        return new api_response_1.ApiResponse('Perfil atribuído ao usuário com sucesso', userRole);
    }
    async findUserRoles(userId) {
        const userRoles = await this.userRoleService.findUserRolesByUserId(userId);
        return new api_response_1.ApiResponse('Perfis do usuário listados com sucesso', userRoles);
    }
    async remove(id) {
        await this.userRoleService.remove(id);
        return new api_response_1.ApiResponse('Perfil removido do usuário com sucesso');
    }
};
exports.UserRoleController = UserRoleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_role_dto_1.CreateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "findUserRoles", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "remove", null);
exports.UserRoleController = UserRoleController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('user-roles'),
    __metadata("design:paramtypes", [user_role_service_1.UserRoleService])
], UserRoleController);
//# sourceMappingURL=user-role.controller.js.map