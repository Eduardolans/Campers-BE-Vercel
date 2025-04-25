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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseDto = exports.CampingResponseDto = exports.CreateCampingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const is_sanitizated_html_decorator_1 = require("../../../../src/decorators/is-sanitizated-html.decorator");
const sanitize_config_1 = require("../../../../src/config/sanitize.config");
class LocationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { campingAddress: { required: true, type: () => String }, mapLink: { required: true, type: () => String, format: "uri" } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], LocationDto.prototype, "campingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], LocationDto.prototype, "mapLink", void 0);
class PricingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pricePerNight: { required: true, type: () => Number }, tarifa: { required: true, type: () => String, enum: ['carpa', 'vehiculo', 'paseDiario'] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PricingDto.prototype, "pricePerNight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Tipo de precio' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['carpa', 'vehiculo', 'paseDiario']),
    __metadata("design:type", String)
], PricingDto.prototype, "tarifa", void 0);
class AmenityDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, name: { required: false, type: () => String }, available: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AmenityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], AmenityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AmenityDto.prototype, "available", void 0);
class MediaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String, format: "uri" }, type: { required: true, type: () => String, enum: ['image', 'video'] } };
    }
}
__decorate([
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], MediaDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['image', 'video']),
    __metadata("design:type", String)
], MediaDto.prototype, "type", void 0);
class NearbyAttractionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], NearbyAttractionDto.prototype, "name", void 0);
class LimitCampingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { maxTents: { required: true, type: () => Number }, maxUsers: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LimitCampingDto.prototype, "maxTents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LimitCampingDto.prototype, "maxUsers", void 0);
class CreateCampingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, location: { required: true, type: () => LocationDto }, description: { required: true, type: () => String }, contactPhone: { required: true, type: () => String }, pricing: { required: true, type: () => PricingDto }, amenities: { required: false, type: () => [AmenityDto] }, nearbyAttractions: { required: false, type: () => [NearbyAttractionDto] }, limitCamping: { required: true, type: () => ({ maxTents: { required: true, type: () => Number }, maxUsers: { required: true, type: () => Number } }) } };
    }
}
exports.CreateCampingDto = CreateCampingDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], CreateCampingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LocationDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", LocationDto)
], CreateCampingDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_RICH_TEXT_CONFIG),
    __metadata("design:type", String)
], CreateCampingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampingDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PricingDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", PricingDto)
], CreateCampingDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AmenityDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], CreateCampingDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [NearbyAttractionDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], CreateCampingDto.prototype, "nearbyAttractions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            maxTents: { type: 'number', example: 5 },
            maxUsers: { type: 'number', example: 10 },
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateCampingDto.prototype, "limitCamping", void 0);
class CampingResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, location: { required: true, type: () => LocationDto }, contactPhone: { required: true, type: () => String }, media: { required: true, type: () => [MediaDto] }, pricing: { required: true, type: () => PricingDto }, amenities: { required: true, type: () => [String] }, limitCamping: { required: true, type: () => LimitCampingDto }, userId: { required: true, type: () => String }, campingId: { required: true, type: () => Number }, nearbyAttractions: { required: true, type: () => [NearbyAttractionDto] }, locationId: { required: true, type: () => Number }, limitCampingId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
}
exports.CampingResponseDto = CampingResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CampingResponseDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CampingResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CampingResponseDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => LocationDto }),
    __metadata("design:type", LocationDto)
], CampingResponseDto.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CampingResponseDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CampingResponseDto.prototype, "media", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", PricingDto)
], CampingResponseDto.prototype, "pricing", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => [AmenityDto] }),
    __metadata("design:type", Array)
], CampingResponseDto.prototype, "amenities", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => LimitCampingDto }),
    __metadata("design:type", LimitCampingDto)
], CampingResponseDto.prototype, "limitCamping", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], CampingResponseDto.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CampingResponseDto.prototype, "campingId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => [NearbyAttractionDto] }),
    __metadata("design:type", Array)
], CampingResponseDto.prototype, "nearbyAttractions", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CampingResponseDto.prototype, "locationId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CampingResponseDto.prototype, "limitCampingId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        return value;
    }),
    __metadata("design:type", Date)
], CampingResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        }
        return value;
    }),
    __metadata("design:type", Date)
], CampingResponseDto.prototype, "updatedAt", void 0);
class PaginatedResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true }, meta: { required: true, type: () => ({ total: { required: true, type: () => Number }, page: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, totalPages: { required: true, type: () => Number } }) } };
    }
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], PaginatedResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=create-camping.dto.js.map