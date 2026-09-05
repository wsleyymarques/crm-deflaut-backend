"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const role_module_1 = require("../role/role.module");
const user_module_1 = require("../user/user.module");
const user_role_controller_1 = require("./user-role.controller");
const user_role_repository_1 = require("./user-role.repository");
const user_role_service_1 = require("./user-role.service");
let UserRoleModule = class UserRoleModule {
};
exports.UserRoleModule = UserRoleModule;
exports.UserRoleModule = UserRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, role_module_1.RoleModule],
        controllers: [user_role_controller_1.UserRoleController],
        providers: [user_role_service_1.UserRoleService, user_role_repository_1.UserRoleRepository],
        exports: [user_role_repository_1.UserRoleRepository],
    })
], UserRoleModule);
//# sourceMappingURL=user-role.module.js.map