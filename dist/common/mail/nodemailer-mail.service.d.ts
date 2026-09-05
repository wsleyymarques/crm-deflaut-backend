import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
export declare class NodemailerMailService implements MailService {
    private readonly config;
    private transporter;
    constructor(config: ConfigService);
    sendPasswordResetCode(email: string, code: string): Promise<void>;
}
