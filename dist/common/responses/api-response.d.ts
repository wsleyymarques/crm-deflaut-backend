export declare class ApiResponse<T> {
    sucesso: boolean;
    mensagem: string;
    dados: T | null;
    timestamp: string;
    statusCode?: number;
    constructor(mensagem: string, dados?: T | null, statusCode?: number);
}
