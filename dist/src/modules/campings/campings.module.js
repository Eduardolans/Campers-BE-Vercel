"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampingsModule = void 0;
const common_1 = require("@nestjs/common");
const campings_service_1 = require("./campings.service");
const campings_controller_1 = require("./campings.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const campings_search_service_1 = require("./campings-search.service");
const campings_search_controller_1 = require("./campings-search.controller");
const camping_gateway_1 = require("../webSockets/camping.gateway");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let CampingsModule = class CampingsModule {
};
exports.CampingsModule = CampingsModule;
exports.CampingsModule = CampingsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [campings_service_1.CampingsService, campings_search_service_1.CampingSearchService, camping_gateway_1.CampingGateway, cloudinary_service_1.CloudinaryService],
        controllers: [campings_controller_1.CampingsController, campings_search_controller_1.CampingsSearchController],
        exports: [campings_service_1.CampingsService, camping_gateway_1.CampingGateway],
    })
], CampingsModule);
//# sourceMappingURL=campings.module.js.map