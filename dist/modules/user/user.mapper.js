"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toEntity(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    static toEntityList(users) {
        return users.map(UserMapper.toEntity);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map