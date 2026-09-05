import { UserEntity } from './entities/user.entity';
export declare class UserMapper {
    static toEntity(user: any): UserEntity;
    static toEntityList(users: any[]): UserEntity[];
}
