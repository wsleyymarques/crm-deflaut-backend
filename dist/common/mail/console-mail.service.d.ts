import { MailService } from './mail.service';
export declare class ConsoleMailService implements MailService {
    private readonly logger;
    sendPasswordResetCode(email: string, code: string): Promise<void>;
}
