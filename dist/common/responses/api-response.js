"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    sucesso;
    mensagem;
    dados;
    timestamp;
    statusCode;
    constructor(mensagem, dados = null, statusCode) {
        this.sucesso = true;
        this.mensagem = mensagem;
        this.dados = dados;
        this.timestamp = new Date().toISOString();
        this.statusCode = statusCode;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api-response.js.map