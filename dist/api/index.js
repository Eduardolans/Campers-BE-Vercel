"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const serverless_express_2 = __importDefault(require("@vendia/serverless-express"));
const app_module_1 = require("../src/app.module");
const core_1 = require("@nestjs/core");
const exception_filter_1 = require("../src/common/exception.filter");
const compression_1 = __importDefault(require("compression"));
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, compression_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    await app.init();
    return (0, serverless_express_1.default)(app.getHttpAdapter().getInstance());
}
const handler = async (event, context) => {
    if (!server) {
        server = await bootstrap();
    }
    return (0, serverless_express_2.default)({ server, event, context, promise: 'PROMISE' });
};
exports.handler = handler;
//# sourceMappingURL=index.js.map