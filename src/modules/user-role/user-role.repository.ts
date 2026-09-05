import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.userRole.create({
      data: createUserRoleDto,
    });
  }

  /**
   * Finds all roles associated with a given user ID.
   * This is a key method for the AuthService to gather roles during login.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of UserRole objects, with the related Role object included.
   */
  async findRolesByUserId(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: true, // Include the full Role object
      },
    });
  }

  async findByUserIdAndRoleId(userId: string, roleId: string) {
    return this.prisma.userRole.findUnique({
      where: {
        userId_roleId: {
          userId,
          roleId,
        },
      },
    });
  }

  async findUserRolesByUserId(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
    });
  }

  async findById(id: string) {
    return this.prisma.userRole.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    await this.prisma.userRole.delete({
      where: { id },
    });
  }
}
