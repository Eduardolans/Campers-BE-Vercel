"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SANITIZE_RICH_TEXT_CONFIG = exports.SANITIZE_CONFIG = void 0;
exports.SANITIZE_CONFIG = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
};
exports.SANITIZE_RICH_TEXT_CONFIG = {
    allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 'code', 'pre', 'blockquote'],
    allowedAttributes: {
        'a': ['href', 'name', 'target'],
    },
    allowedIframeHostnames: [],
};
//# sourceMappingURL=sanitize.config.js.map