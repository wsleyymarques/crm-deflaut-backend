import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PasswordResetCodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(codeHash: string, userId: string, expiresAt: Date) {
    return this.prisma.passwordResetCode.create({
      data: {
        codeHash,
        userId,
        expiresAt,
      },
    });
  }

  async findLatestByUserId(userId: string) {
    return this.prisma.passwordResetCode.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async incrementAttempts(id: string) {
    return this.prisma.passwordResetCode.update({
      where: { id },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.passwordResetCode.delete({
      where: { id },
    });
  }

  async deleteAllByUserId(userId: string) {
    return this.prisma.passwordResetCode.deleteMany({
      where: { userId },
    });
  }
}
