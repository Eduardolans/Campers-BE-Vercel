"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./modules/users/users.module");
const campings_module_1 = require("./modules/campings/campings.module");
const auth_module_1 = require("./modules/auth/auth.module");
const campings_service_1 = require("./modules/campings/campings.service");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("@nestjs/cache-manager");
const reservations_module_1 = require("./modules/reservations/reservations.module");
const jwt_config_1 = require("./config/jwt.config");
const redis_config_1 = require("./config/redis.config");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
const mercado_pago_module_1 = require("./modules/mercado-pago/mercado-pago.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                useFactory: () => (0, redis_config_1.redisConfig)(),
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            campings_module_1.CampingsModule,
            auth_module_1.AuthModule,
            reservations_module_1.ReservationsModule,
            mercado_pago_module_1.MercadoPagoModule,
            jwt_1.JwtModule.register((0, jwt_config_1.jwtConfig)()),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [],
        providers: [campings_service_1.CampingsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map