"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = redisConfig;
const common_1 = require("@nestjs/common");
const redis_1 = require("@keyv/redis");
const cacheable_1 = require("cacheable");
async function redisConfig() {
    const logger = new common_1.Logger('Redis');
    try {
        const redisStore = (0, redis_1.createKeyv)('redis://localhost:15222');
        await redisStore.set('connection-test', 'ok', 1000);
        logger.log('Conectado a Redis con exito');
        return {
            store: redisStore,
            ttl: 60000,
        };
    }
    catch (err) {
        logger.warn(`Error en la coneccion con Redis:, ${err.message} ----- Se usara cache en local ----`);
        return {
            store: new cacheable_1.CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            ttl: 60000,
        };
    }
}
//# sourceMappingURL=redis.config.js.map