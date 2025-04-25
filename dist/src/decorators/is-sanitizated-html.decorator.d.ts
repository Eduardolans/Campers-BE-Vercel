import { ValidationOptions } from 'class-validator';
import sanitizeHtml from 'sanitize-html';
export declare function IsSanitizedHtml(config?: sanitizeHtml.IOptions, ValidationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
