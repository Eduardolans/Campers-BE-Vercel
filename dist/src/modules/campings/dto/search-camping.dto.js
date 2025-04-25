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
exports.CampingResponseDto = exports.SearchCampingDto = exports.NearbyAttractionDto = exports.AmenityDto = exports.PricingDto = exports.LocationDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const is_sanitizated_html_decorator_1 = require("../../../decorators/is-sanitizated-html.decorator");
const sanitize_config_1 = require("../../../config/sanitize.config");
class LocationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { campingAddress: { required: true, type: () => String }, mapLink: { required: true, type: () => String, format: "uri" } };
    }
}
exports.LocationDto = LocationDto;
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
exports.PricingDto = PricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Precio por noche' }),
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
        return { name: { required: false, type: () => String }, available: { required: false, type: () => Boolean } };
    }
}
exports.AmenityDto = AmenityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Nombre del servicio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], AmenityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Disponibilidad del servicio' }),
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
exports.NearbyAttractionDto = NearbyAttractionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Nombre de la atracción cercana' }),
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
    __metadata("design:type", Number)
], LimitCampingDto.prototype, "maxTents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LimitCampingDto.prototype, "maxUsers", void 0);
class SearchCampingDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, pricing: { required: false, type: () => [require("./search-camping.dto").PricingDto] }, pricePerNight: { required: false, type: () => Number }, tarifa: { required: false, type: () => String }, campingAddress: { required: false, type: () => String }, mapLink: { required: false, type: () => String }, amenities: { required: false, type: () => [String] }, nearbyAttractions: { required: false, type: () => [String] }, maxUsers: { required: false, type: () => Number, minimum: 1 }, maxTents: { required: false, type: () => Number, minimum: 1 }, page: { required: false, type: () => Number, default: 1, minimum: 1 }, limit: { required: false, type: () => Number, default: 10, minimum: 1, maximum: 100 } };
    }
}
exports.SearchCampingDto = SearchCampingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Nombre del camping' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchCampingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [PricingDto], description: 'Criterios de precios' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PricingDto),
    __metadata("design:type", Array)
], SearchCampingDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Precio por noche exacto a buscar' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], SearchCampingDto.prototype, "pricePerNight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Precio por noche exacto a buscar' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchCampingDto.prototype, "tarifa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Direccion del camping' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], SearchCampingDto.prototype, "campingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Link del mapa con la ubicacion del camping' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchCampingDto.prototype, "mapLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [AmenityDto], description: 'Servicios disponibles' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    __metadata("design:type", Array)
], SearchCampingDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [NearbyAttractionDto], description: 'Atracciones cercanas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    __metadata("design:type", Array)
], SearchCampingDto.prototype, "nearbyAttractions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'numero maximo de usuarios' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], SearchCampingDto.prototype, "maxUsers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'numero maximo de carpas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], SearchCampingDto.prototype, "maxTents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Número de página' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], SearchCampingDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Límite de resultados por página' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], SearchCampingDto.prototype, "limit", void 0);
class CampingResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, location: { required: true, type: () => require("./search-camping.dto").LocationDto }, contactPhone: { required: true, type: () => String }, media: { required: true, type: () => [MediaDto] }, pricing: { required: true, type: () => require("./search-camping.dto").PricingDto }, amenities: { required: true, type: () => [String] }, nearbyAttractions: { required: true, type: () => [require("./search-camping.dto").NearbyAttractionDto] }, limitCamping: { required: true, type: () => LimitCampingDto }, userId: { required: true, type: () => String }, locationId: { required: true, type: () => Number }, limitCampingId: { required: true, type: () => Number }, createdAt: { required: true, type: () => Object }, updatedAt: { required: true, type: () => Object } };
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
    (0, swagger_1.ApiProperty)({ type: () => [NearbyAttractionDto] }),
    __metadata("design:type", Array)
], CampingResponseDto.prototype, "nearbyAttractions", void 0);
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
], CampingResponseDto.prototype, "locationId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CampingResponseDto.prototype, "limitCampingId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = typeof value === 'string' ? new Date(value) : value;
        return date ? date.toISOString().split('T')[0] : null;
    }),
    __metadata("design:type", Object)
], CampingResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const date = typeof value === 'string' ? new Date(value) : value;
        return date ? date.toISOString().split('T')[0] : null;
    }),
    __metadata("design:type", Object)
], CampingResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=search-camping.dto.js.map