import { Injectable } from '@nestjs/common';
import { ListQueryDto } from '../../common/dto/list-query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll(query: ListQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [roles, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        skip,
        take: Number(limit),
        orderBy: { name: 'asc' },
      }),
      this.prisma.role.count(),
    ]);

    return {
      data: roles,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string) {
    await this.prisma.role.delete({
      where: { id },
    });
  }
}
