export interface PasswordGenerateConfig {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeSimilar: boolean;
}
export declare const DEFAULT_PASSWORD_CONFIG: PasswordGenerateConfig;
export declare function generatePassword(config?: Partial<PasswordGenerateConfig>): string;
