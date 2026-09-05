import { PrismaService } from '../../prisma/prisma.service';
export declare class PasswordResetCodeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(codeHash: string, userId: string, expiresAt: Date): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        codeHash: string;
        attempts: number;
        expiresAt: Date;
    }>;
    findLatestByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        codeHash: string;
        attempts: number;
        expiresAt: Date;
    } | null>;
    incrementAttempts(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        codeHash: string;
        attempts: number;
        expiresAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        codeHash: string;
        attempts: number;
        expiresAt: Date;
    }>;
    deleteAllByUserId(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
