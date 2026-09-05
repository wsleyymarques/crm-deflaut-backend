"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = void 0;
class RoleMapper {
    static toEntity(role) {
        return {
            id: role.id,
            name: role.name,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        };
    }
    static toEntityList(roles) {
        return roles.map(RoleMapper.toEntity);
    }
}
exports.RoleMapper = RoleMapper;
//# sourceMappingURL=role.mapper.js.map