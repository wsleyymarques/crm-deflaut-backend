"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const api_response_1 = require("../responses/api-response");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.BAD_REQUEST;
        let mensagem = 'Dados inválidos informados';
        let errors = {};
        if (exception instanceof Array && exception[0] instanceof class_validator_1.ValidationError) {
            const validationErrors = exception;
            errors = this.formatErrors(validationErrors);
            mensagem = 'Erro de validação nos dados enviados';
        }
        const errorResponse = new api_response_1.ApiResponse(mensagem, { errors });
        errorResponse.sucesso = false;
        errorResponse.statusCode = status;
        response.status(status).json(errorResponse);
    }
    formatErrors(errors) {
        const formatted = {};
        errors.forEach((error) => {
            if (error.constraints) {
                formatted[error.property] = Object.values(error.constraints);
            }
            if (error.children && error.children.length > 0) {
                const childErrors = this.formatErrors(error.children);
                Object.assign(formatted, childErrors);
            }
        });
        return formatted;
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)()
], ValidationExceptionFilter);
//# sourceMappingURL=validation-exception.filter.js.map