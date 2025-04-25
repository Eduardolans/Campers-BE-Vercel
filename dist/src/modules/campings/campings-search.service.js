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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampingSearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const keyCache_generate_1 = require("../../common/keyCache.generate");
const library_1 = require("@prisma/client/runtime/library");
let CampingSearchService = class CampingSearchService {
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
        this.campingWithDetails = {
            include: {
                location: true,
                pricing: true,
                amenities: true,
                nearbyAttractions: true,
                media: true,
                limitCamping: true,
            },
        };
    }
    async searchCampings(filters) {
        try {
            let { name, campingAddress, mapLink, amenities, pricePerNight, tarifa, nearbyAttractions, maxUsers, maxTents } = filters;
            const cacheKey = (0, keyCache_generate_1.generateCacheKey)(filters);
            const resultCache = await this.cacheManager.get(cacheKey);
            if (resultCache) {
                return resultCache;
            }
            if (filters.amenities && !Array.isArray(filters.amenities)) {
                filters.amenities = [filters.amenities];
            }
            if (filters.nearbyAttractions && !Array.isArray(filters.nearbyAttractions)) {
                filters.nearbyAttractions = [filters.nearbyAttractions];
            }
            let where = {
                AND: [
                    ...(filters.name ? [{ name: { contains: filters.name, mode: 'insensitive' } }] : []),
                    ...(filters.campingAddress
                        ? [{ location: { campingAddress: { contains: filters.campingAddress, mode: 'insensitive' } } }]
                        : []),
                    ...(filters.mapLink ? [{ location: { mapLink: { contains: filters.mapLink, mode: 'insensitive' } } }] : []),
                    ...(filters.amenities
                        ? filters.amenities.map((amenity) => ({
                            amenities: {
                                some: {
                                    name: {
                                        equals: amenity,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        }))
                        : []),
                    ...(filters.pricePerNight || filters.tarifa
                        ? [
                            {
                                pricing: {
                                    some: {
                                        AND: [
                                            filters.pricePerNight ? { pricePerNight: Number(filters.pricePerNight) } : {},
                                            filters.tarifa ? { tarifa: filters.tarifa } : {},
                                        ],
                                    },
                                },
                            },
                        ]
                        : []),
                    ...(filters.nearbyAttractions
                        ? filters.nearbyAttractions.map((attraction) => ({
                            nearbyAttractions: {
                                some: {
                                    name: {
                                        equals: attraction,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        }))
                        : []),
                    ...(filters.maxUsers ? [{ limitCamping: { maxUsers: Number(filters.maxUsers) } }] : []),
                    ...(filters.maxTents ? [{ limitCamping: { maxTents: Number(filters.maxTents) } }] : []),
                ].filter(Boolean),
            };
            const [campings, total] = await Promise.all([
                this.prisma.camping.findMany({
                    ...this.campingWithDetails,
                    where,
                    skip: ((Number(filters.page) || 1) - 1) * (Number(filters.limit) || 10),
                    take: Number(filters.limit) || 10,
                    orderBy: {
                        id: 'asc',
                    },
                }),
                this.prisma.camping.count({ where }),
            ]);
            if (campings.length === 0) {
                throw new common_1.NotFoundException('No campings found with the specified criteria.');
            }
            const transformedCampings = campings.map((camping) => ({
                id: camping.id,
                name: camping.name,
                description: camping.description,
                location: camping.location,
                contactPhone: camping.contactPhone,
                media: camping.media,
                pricing: camping.pricing,
                amenities: camping.amenities,
                nearbyAttractions: camping.nearbyAttractions,
                limitCamping: camping.limitCamping,
            }));
            const result = {
                data: transformedCampings,
                pagination: {
                    total,
                    page: Number(filters.page) || 1,
                    limit: Number(filters.limit) || 10,
                    totalPages: Math.ceil(total / (Number(filters.limit) || 10)),
                },
            };
            await this.cacheManager.set(cacheKey, result, 30000);
            return result;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_1.ServiceUnavailableException('Database connection error.');
            }
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Failed to search campings.');
            }
            throw error;
        }
    }
};
exports.CampingSearchService = CampingSearchService;
exports.CampingSearchService = CampingSearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], CampingSearchService);
//# sourceMappingURL=campings-search.service.js.map