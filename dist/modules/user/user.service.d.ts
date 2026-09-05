import { ListQueryDto } from '../../common/dto/list-query.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    private hashPassword;
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    findAll(query: ListQueryDto): Promise<{
        data: import("./entities/user.entity").UserEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>;
    findById(id: string): Promise<import("./entities/user.entity").UserEntity>;
    findByEmail(email: string): Promise<import("./entities/user.entity").UserEntity>;
    findByEmailWithPassword(email: string): Promise<{
        name: string;
        email: string;
        id: string;
        hashedPassword: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void>;
    remove(id: string): Promise<void>;
    forceSetPassword(id: string, newPassword: string): Promise<void>;
}
