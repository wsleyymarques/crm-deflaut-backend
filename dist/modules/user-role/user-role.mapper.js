"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleMapper = void 0;
class UserRoleMapper {
    static toEntity(userRole) {
        return {
            id: userRole.id,
            userId: userRole.userId,
            roleId: userRole.roleId,
            createdAt: userRole.createdAt,
        };
    }
    static toEntityList(userRoles) {
        return userRoles.map(UserRoleMapper.toEntity);
    }
}
exports.UserRoleMapper = UserRoleMapper;
//# sourceMappingURL=user-role.mapper.js.map