export declare const MAIL_SERVICE: unique symbol;
export interface MailService {
    sendPasswordResetCode(email: string, code: string): Promise<void>;
    sendWelcomeEmail(email: string, name: string, temporaryPassword?: string): Promise<void>;
}
