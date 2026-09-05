import { UserRoleEntity } from './entities/user-role.entity';
export declare class UserRoleMapper {
    static toEntity(userRole: any): UserRoleEntity;
    static toEntityList(userRoles: any[]): UserRoleEntity[];
}
