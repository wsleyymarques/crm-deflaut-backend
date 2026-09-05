import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
export declare class UserRoleRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserRoleDto: CreateUserRoleDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    }>;
    findRolesByUserId(userId: string): Promise<({
        role: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    })[]>;
    findByUserIdAndRoleId(userId: string, roleId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    } | null>;
    findUserRolesByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    } | null>;
    remove(id: string): Promise<void>;
}
