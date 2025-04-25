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
exports.CampingsSearchController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const campings_search_service_1 = require("./campings-search.service");
const search_camping_dto_1 = require("./dto/search-camping.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_guard_1 = require("../../guards/auth-guard.guard");
let CampingsSearchController = class CampingsSearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async search(searchParams) {
        try {
            return await this.searchService.searchCampings(searchParams);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }
};
exports.CampingsSearchController = CampingsSearchController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, validateCustomDecorators: true })),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns filtered campings with detailed information',
        schema: {
            example: {
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    limit: 10,
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'campingAddress', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'mapLink', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'pricePerNight', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'tarifa', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'amenities', required: false, isArray: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'nearbyAttractions', required: false, isArray: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'maxUsers', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'maxTents', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_camping_dto_1.SearchCampingDto]),
    __metadata("design:returntype", Promise)
], CampingsSearchController.prototype, "search", null);
exports.CampingsSearchController = CampingsSearchController = __decorate([
    (0, common_1.Controller)('campings/search'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [campings_search_service_1.CampingSearchService])
], CampingsSearchController);
//# sourceMappingURL=campings-search.controller.js.map