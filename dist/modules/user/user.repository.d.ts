import { ListQueryDto } from '../../common/dto/list-query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly userSafeSelect;
    create(createUserDto: CreateUserDto, hashedPassword: any): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(query: ListQueryDto): Promise<{
        data: {
            name: string;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            lastPage: number;
        };
    }>;
    findById(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByIdWithPassword(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        hashedPassword: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmailWithPassword(email: string): Promise<{
        name: string;
        email: string;
        id: string;
        hashedPassword: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, newHash: string): Promise<void>;
    remove(id: string): Promise<void>;
}
