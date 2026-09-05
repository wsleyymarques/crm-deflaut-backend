import { ApiResponse } from '../../common/responses/api-response';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    create(createUserRoleDto: CreateUserRoleDto): Promise<ApiResponse<import("./entities/user-role.entity").UserRoleEntity>>;
    findUserRoles(userId: string): Promise<ApiResponse<import("./entities/user-role.entity").UserRoleEntity[]>>;
    remove(id: string): Promise<ApiResponse<unknown>>;
}
