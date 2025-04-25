"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSanitizedHtml = IsSanitizedHtml;
const class_validator_1 = require("class-validator");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function IsSanitizedHtml(config, ValidationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isSanitizedHtml',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [config],
            options: ValidationOptions,
            validator: {
                validate(value, args) {
                    if (typeof value !== 'string')
                        return false;
                    const [sanitizeConfig] = args.constraints;
                    const sanitized = (0, sanitize_html_1.default)(value, {
                        allowedTags: [],
                        allowedAttributes: {},
                        ...sanitizeConfig,
                    });
                    return sanitized === value;
                },
                defaultMessage(args) {
                    return `${args.property} must be a sanitized HTML string`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-sanitizated-html.decorator.js.map