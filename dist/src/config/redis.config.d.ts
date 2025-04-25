import { CacheableMemory } from 'cacheable';
export declare function redisConfig(): Promise<{
    store: import("keyv").Keyv<any>;
    ttl: number;
} | {
    store: CacheableMemory;
    ttl: number;
}>;
