import { PrismaService } from '../../prisma/prisma.service';
export declare class RefreshTokenRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tokenHash: string, userId: string, expiresAt: Date): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        tokenHash: string;
    }>;
    findByTokenHash(tokenHash: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        tokenHash: string;
    } | null>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        tokenHash: string;
    }>;
    deleteAllByUserId(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
