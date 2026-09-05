"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorCodes["USER_EMAIL_DUPLICATE"] = "USER_EMAIL_DUPLICATE";
    ErrorCodes["USER_INACTIVE"] = "USER_INACTIVE";
    ErrorCodes["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    ErrorCodes["TOKEN_INVALID"] = "TOKEN_INVALID";
    ErrorCodes["INVALID_REFRESH_TOKEN"] = "INVALID_REFRESH_TOKEN";
    ErrorCodes["ROLE_NOT_ALLOWED"] = "ROLE_NOT_ALLOWED";
    ErrorCodes["PERMISSION_NOT_ALLOWED"] = "PERMISSION_NOT_ALLOWED";
    ErrorCodes["FORBIDDEN_ACTION"] = "FORBIDDEN_ACTION";
    ErrorCodes["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    ErrorCodes["ROLE_NOT_FOUND"] = "ROLE_NOT_FOUND";
    ErrorCodes["PERMISSION_NOT_FOUND"] = "PERMISSION_NOT_FOUND";
    ErrorCodes["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
exports.ERROR_MESSAGES = {
    [ErrorCodes.USER_NOT_FOUND]: 'Usuário não encontrado',
    [ErrorCodes.USER_EMAIL_DUPLICATE]: 'E-mail já cadastrado',
    [ErrorCodes.USER_INACTIVE]: 'Usuário inativo',
    [ErrorCodes.INVALID_CREDENTIALS]: 'Credenciais inválidas',
    [ErrorCodes.TOKEN_INVALID]: 'Token inválido',
    [ErrorCodes.INVALID_REFRESH_TOKEN]: 'Token de atualização inválido ou expirado',
    [ErrorCodes.ROLE_NOT_ALLOWED]: 'Perfil não permitido para esta ação',
    [ErrorCodes.PERMISSION_NOT_ALLOWED]: 'Permissão não permitida para esta ação',
    [ErrorCodes.FORBIDDEN_ACTION]: 'Ação não permitida',
    [ErrorCodes.VALIDATION_FAILED]: 'Dados inválidos informados',
    [ErrorCodes.ROLE_NOT_FOUND]: 'Perfil não encontrado',
    [ErrorCodes.PERMISSION_NOT_FOUND]: 'Permissão não encontrada',
    [ErrorCodes.RESOURCE_NOT_FOUND]: 'Recurso não encontrado',
};
//# sourceMappingURL=exception.enum.js.map