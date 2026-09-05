import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(tokenHash: string, userId: string, expiresAt: Date) {
    return this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  async findByTokenHash(tokenHash: string) {
    return this.prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
  }

  async delete(id: string) {
    return this.prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteAllByUserId(userId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
