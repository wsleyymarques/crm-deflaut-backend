import { RoleEntity } from './entities/role.entity';
export declare class RoleMapper {
    static toEntity(role: any): RoleEntity;
    static toEntityList(roles: any[]): RoleEntity[];
}
