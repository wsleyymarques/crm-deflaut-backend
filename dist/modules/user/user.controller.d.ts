import { ListQueryDto } from '../../common/dto/list-query.dto';
import { ApiResponse } from '../../common/responses/api-response';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ApiResponse<import("./entities/user.entity").UserEntity>>;
    findAll(query: ListQueryDto): Promise<ApiResponse<{
        data: import("./entities/user.entity").UserEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>>;
    findOne(id: string): Promise<ApiResponse<import("./entities/user.entity").UserEntity>>;
    update(id: string, updateUserDto: UpdateUserDto, currentUser: JwtPayload): Promise<ApiResponse<import("./entities/user.entity").UserEntity>>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto, currentUser: JwtPayload): Promise<ApiResponse<unknown>>;
    remove(id: string): Promise<ApiResponse<unknown>>;
}
