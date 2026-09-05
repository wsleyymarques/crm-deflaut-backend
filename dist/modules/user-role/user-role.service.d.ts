import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleRepository } from './user-role.repository';
export declare class UserRoleService {
    private readonly userRoleRepository;
    private readonly userService;
    private readonly roleService;
    constructor(userRoleRepository: UserRoleRepository, userService: UserService, roleService: RoleService);
    create(createUserRoleDto: CreateUserRoleDto): Promise<import("./entities/user-role.entity").UserRoleEntity>;
    findUserRolesByUserId(userId: string): Promise<import("./entities/user-role.entity").UserRoleEntity[]>;
    remove(id: string): Promise<void>;
}
