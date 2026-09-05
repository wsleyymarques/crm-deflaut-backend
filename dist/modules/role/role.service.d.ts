import { ListQueryDto } from '../../common/dto/list-query.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    create(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").RoleEntity>;
    findAll(query: ListQueryDto): Promise<{
        data: import("./entities/role.entity").RoleEntity[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>;
    findById(id: string): Promise<import("./entities/role.entity").RoleEntity>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./entities/role.entity").RoleEntity>;
    remove(id: string): Promise<void>;
}
