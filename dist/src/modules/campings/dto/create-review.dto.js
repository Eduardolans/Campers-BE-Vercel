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
exports.createReviewDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sanitize_config_1 = require("../../../config/sanitize.config");
const is_sanitizated_html_decorator_1 = require("../../../decorators/is-sanitizated-html.decorator");
class createReviewDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { campingId: { required: true, type: () => Number }, name: { required: true, type: () => String }, date: { required: true, type: () => Date }, comment: { required: true, type: () => String }, rating: { required: true, type: () => Number, minimum: 0, maximum: 5 }, profilePic: { required: false, type: () => String } };
    }
}
exports.createReviewDto = createReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createReviewDto.prototype, "campingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'leoanrdo nf' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createReviewDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '03/12/2025' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], createReviewDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'muy bueno' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, is_sanitizated_html_decorator_1.IsSanitizedHtml)(sanitize_config_1.SANITIZE_CONFIG),
    __metadata("design:type", String)
], createReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.8 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], createReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'perfil.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createReviewDto.prototype, "profilePic", void 0);
//# sourceMappingURL=create-review.dto.js.map