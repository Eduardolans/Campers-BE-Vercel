"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const library_2 = require("@prisma/client/runtime/library");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        let name = '';
        let stack = undefined;
        if (exception instanceof library_2.PrismaClientInitializationError) {
            status = common_1.HttpStatus.SERVICE_UNAVAILABLE;
            message = 'Database connection error';
            name = exception.name;
            stack = exception.stack;
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = this.handlePrismaError(exception);
            name = exception.name;
            stack = exception.stack;
        }
        else if (exception instanceof library_1.PrismaClientValidationError) {
            status = common_1.HttpStatus.UNPROCESSABLE_ENTITY;
            message = `Validation error: ${exception.message}`;
            name = exception.name;
            stack = exception.stack;
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : res?.message || message;
            name = exception.name;
            stack = exception.stack;
        }
        else if (exception instanceof Error &&
            exception.message &&
            exception.message.toLowerCase().includes('cloudinary')) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = `Error uploading files to Cloudinary: ${exception.message}`;
            name = exception.name;
            stack = exception.stack;
        }
        else if (exception instanceof Error) {
            message = exception.message;
            name = exception.name;
            stack = exception.stack;
        }
        this.logger.error(`[${status}] ${request.method} ${request.url} - ${message}`, JSON.stringify({
            user: request.user?.id || 'Unknown user',
            body: request.body,
            stack,
        }));
        response.status(status).json({
            statusCode: status,
            name,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
    handlePrismaError(error) {
        switch (error.code) {
            case 'P2002':
                return 'Duplicate record (unique constraint violation)';
            case 'P2025':
                return 'Record not found';
            default:
                return 'Database connection error';
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map