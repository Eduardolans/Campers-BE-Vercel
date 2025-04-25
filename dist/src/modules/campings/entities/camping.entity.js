"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campingWithDetails = void 0;
const openapi = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
exports.campingWithDetails = client_1.Prisma.validator()({
    include: {
        amenities: true,
        location: true,
        pricing: true,
        nearbyAttractions: true,
    },
});
//# sourceMappingURL=camping.entity.js.map