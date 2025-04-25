"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampingsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const campings_service_1 = require("./campings.service");
const auth_guard_guard_1 = require("../../guards/auth-guard.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorators_1 = require("../../decorators/roles.decorators");
const role_enum_1 = require("../../common/enums/role.enum");
const roles_guard_1 = require("../../guards/roles.guard");
const swagger_2 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const review_response_dto_1 = require("./dto/review-response.dto");
const create_review_dto_1 = require("./dto/create-review.dto");
let CampingsController = class CampingsController {
    constructor(campingsService) {
        this.campingsService = campingsService;
    }
    async create(req, createCampingDto, files) {
        const a = JSON.parse(createCampingDto['createCampingDto']);
        console.log(a, files);
        return await this.campingsService.create(a, req?.user.id, files);
    }
    async findAll(page = 1, limit = 10) {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        return this.campingsService.findAll(pageNumber, limitNumber);
    }
    async remove(id, req) {
        const userId = req.user.id;
        return this.campingsService.remove(+id, userId);
    }
    async update(id, req, updateCampingDto, files) {
        if (files && files.length > 0) {
            const maxFileSize = 1024 * 1024 * 4;
            const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
            for (const file of files) {
                const fileSizeValidator = new common_1.MaxFileSizeValidator({ maxSize: maxFileSize });
                if (!fileSizeValidator.isValid(file)) {
                    throw new common_1.BadRequestException(`File size exceeds the limit of ${maxFileSize / (1024 * 1024)} MB`);
                }
                const fileTypeValidator = new common_1.FileTypeValidator({ fileType: allowedFileTypes.join('|') });
                if (!fileTypeValidator.isValid(file)) {
                    throw new common_1.BadRequestException(`Invalid file type. Allowed types are ${allowedFileTypes.join(', ')}`);
                }
            }
        }
        const parsedDto = JSON.parse(updateCampingDto['updateCampingDto']);
        return await this.campingsService.update(Number(id), parsedDto, req.user.id, files);
    }
    createReviews(body, req) {
        return this.campingsService.createReviews(req.user.id, [body]);
    }
    getReviews(campingId) {
        return this.campingsService.getReviewsByCampingId(parseInt(campingId));
    }
    async addFavourite(campingId, req) {
        const dto = {
            campingId: Number(campingId),
            userId: req.user.id,
        };
        await this.campingsService.addFavourite(dto);
        return { message: 'Camping added to favourites' };
    }
    async removeFavourite(campingId, req) {
        await this.campingsService.removeFavourite(req.user.id, Number(campingId));
        return { message: 'Camping deleted from favourites' };
    }
    async getFavourites(req) {
        return this.campingsService.getFavouritesByUser(req.user.id);
    }
};
exports.CampingsController = CampingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_enum_1.Role.owner),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new camping' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    (0, swagger_2.ApiConsumes)('multipart/form-data'),
    (0, swagger_2.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                createCampingDto: {
                    type: 'string',
                    example: '{"name": "John", "age": 30}',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all campings' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_enum_1.Role.owner),
    (0, swagger_1.ApiOperation)({ summary: 'Delete one camping' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)(role_enum_1.Role.owner),
    (0, swagger_1.ApiOperation)({ summary: 'Update one camping' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    (0, swagger_2.ApiConsumes)('multipart/form-data'),
    (0, swagger_2.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
                updateCampingDto: {
                    type: 'string',
                    example: '{"name": "Updated Name", "description": "Updated Description"}',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Array]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Create camping reviews' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: [review_response_dto_1.ReviewResponseDto] }),
    (0, swagger_2.ApiBody)({ type: create_review_dto_1.createReviewDto }),
    openapi.ApiResponse({ status: 201, type: [require("./dto/review-response.dto").ReviewResponseDto] }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.createReviewDto, Object]),
    __metadata("design:returntype", void 0)
], CampingsController.prototype, "createReviews", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews from one camping' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [review_response_dto_1.ReviewResponseDto] }),
    openapi.ApiResponse({ status: 200, type: [require("./dto/review-response.dto").ReviewResponseDto] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Post)(':id/favourites'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add one camping to favourites' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "addFavourite", null);
__decorate([
    (0, common_1.Delete)(':id/favourites'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete one camping from favourites' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "removeFavourite", null);
__decorate([
    (0, common_1.Get)('favourites'),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all favourite campings of the authenticated user' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampingsController.prototype, "getFavourites", null);
exports.CampingsController = CampingsController = __decorate([
    (0, common_1.Controller)('campings'),
    (0, swagger_1.ApiTags)('Campings'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [campings_service_1.CampingsService])
], CampingsController);
//# sourceMappingURL=campings.controller.js.map