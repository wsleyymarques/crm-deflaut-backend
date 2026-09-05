import { ListQueryDto } from '../../common/dto/list-query.dto';
import { ApiResponse } from '../../common/responses/api-response';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<ApiResponse<import("./entities/role.entity").RoleEntity>>;
    findAll(query: ListQueryDto): Promise<ApiResponse<{
        data: import("./entities/role.entity").RoleEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>>;
    findOne(id: string): Promise<ApiResponse<import("./entities/role.entity").RoleEntity>>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<ApiResponse<import("./entities/role.entity").RoleEntity>>;
    remove(id: string): Promise<ApiResponse<unknown>>;
}
