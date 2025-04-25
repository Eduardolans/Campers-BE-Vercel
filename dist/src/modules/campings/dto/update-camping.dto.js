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
exports.UpdateCampingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const is_sanitizated_html_decorator_1 = require(".../../decorators/is-sanitizated-html.decorator");
const sanitize_config_1 = require("../../../config/sanitize.config");
class UpdateLocationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { campingAddress: { required: false, type: () => String }, mapLink: { required: false, type: () => String, format: "uri" } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "campingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "mapLink", void 0);
class UpdatePricingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pricePerNight: { required: false, type: () => Number }, tarifa: { required: false, type: () => String, enum: ['carpa', 'vehiculo', 'paseDiario'] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdatePricingDto.prototype, "pricePerNight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Tipo de precio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['carpa', 'vehiculo', 'paseDiario']),
    __metadata("design:type", String)
], UpdatePricingDto.prototype, "tarifa", void 0);
class UpdateAmenityDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, name: { required: false, type: () => String }, available: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAmenityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], UpdateAmenityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAmenityDto.prototype, "available", void 0);
class UpdateNearbyAttractionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], UpdateNearbyAttractionDto.prototype, "name", void 0);
class UpdateLimitCampingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { maxTents: { required: false, type: () => Number }, maxUsers: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLimitCampingDto.prototype, "maxTents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateLimitCampingDto.prototype, "maxUsers", void 0);
class UpdateCampingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, location: { required: false, type: () => UpdateLocationDto }, description: { required: false, type: () => String }, contactPhone: { required: false, type: () => String }, pricing: { required: false, type: () => [UpdatePricingDto] }, amenities: { required: false, type: () => [UpdateAmenityDto] }, nearbyAttractions: { required: false, type: () => [UpdateNearbyAttractionDto] }, limitCamping: { required: false, type: () => UpdateLimitCampingDto } };
    }
}
exports.UpdateCampingDto = UpdateCampingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], UpdateCampingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UpdateLocationDto, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateLocationDto),
    __metadata("design:type", UpdateLocationDto)
], UpdateCampingDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_RICH_TEXT_CONFIG),
    __metadata("design:type", String)
], UpdateCampingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampingDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UpdatePricingDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdatePricingDto),
    __metadata("design:type", Array)
], UpdateCampingDto.prototype, "pricing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UpdateAmenityDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateAmenityDto),
    __metadata("design:type", Array)
], UpdateCampingDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UpdateNearbyAttractionDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateNearbyAttractionDto),
    __metadata("design:type", Array)
], UpdateCampingDto.prototype, "nearbyAttractions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UpdateLimitCampingDto, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateLimitCampingDto),
    __metadata("design:type", UpdateLimitCampingDto)
], UpdateCampingDto.prototype, "limitCamping", void 0);
//# sourceMappingURL=update-camping.dto.js.map