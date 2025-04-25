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
var CampingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_camping_dto_1 = require("./dto/create-camping.dto");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const camping_gateway_1 = require("../webSockets/camping.gateway");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const camping_error_messages_1 = require("../../common/errorMessages/camping-error-messages");
const library_1 = require("@prisma/client/runtime/library");
let CampingsService = CampingsService_1 = class CampingsService {
    constructor(prisma, campingGateway, CloudinaryService) {
        this.prisma = prisma;
        this.campingGateway = campingGateway;
        this.CloudinaryService = CloudinaryService;
        this.logger = new common_1.Logger(CampingsService_1.name);
    }
    async findAll(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [campings, total] = await Promise.all([
                this.prisma.camping.findMany({
                    skip,
                    take: limit,
                    include: {
                        location: true,
                        media: true,
                        pricing: true,
                        amenities: true,
                        nearbyAttractions: true,
                        limitCamping: true,
                    },
                }),
                this.prisma.camping.count(),
            ]);
            const response = {
                data: (0, class_transformer_1.plainToInstance)(create_camping_dto_1.CampingResponseDto, campings, {
                    excludeExtraneousValues: true,
                }),
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
            return (0, class_transformer_1.plainToInstance)((create_camping_dto_1.PaginatedResponseDto), response, {
                excludeExtraneousValues: true,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                console.error('Database connection error:', error);
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof common_1.InternalServerErrorException) {
                console.error('Error getting all campings:', error);
                throw new common_1.InternalServerErrorException(`Error getting all campings: ${error.message}`);
            }
            throw error;
        }
    }
    async remove(id, userId) {
        try {
            const campingToDelete = await this.prisma.camping.findUnique({
                where: { id },
                include: {
                    location: true,
                    pricing: true,
                    amenities: true,
                    nearbyAttractions: true,
                    limitCamping: true,
                    media: true,
                },
            });
            if (!campingToDelete) {
                throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND(id));
            }
            if (campingToDelete.userId !== userId) {
                throw new common_1.BadRequestException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_AUTHORIZED);
            }
            await this.prisma.$transaction([
                this.prisma.pricing.deleteMany({ where: { campingId: id } }),
                this.prisma.nearbyAttraction.deleteMany({ where: { campingId: id } }),
                this.prisma.amenity.deleteMany({ where: { campings: { some: { id } } } }),
                this.prisma.media.deleteMany({ where: { campingId: id } }),
                this.prisma.camping.delete({ where: { id } }),
            ]);
            this.logger.log(`Attempting to delete camping with ID ${id}`);
            this.logger.log(`Camping delete successfully: ${campingToDelete.name}`);
            return (0, class_transformer_1.plainToInstance)(create_camping_dto_1.CampingResponseDto, campingToDelete, {
                excludeExtraneousValues: true,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                console.error('Database connection error:', error);
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND(id));
                }
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error deleting camping');
            }
            throw error;
        }
    }
    async create(data, userId, files) {
        try {
            const { location, pricing = [], amenities = [], nearbyAttractions = [], limitCamping, ...rest } = data;
            const promiseFile = files.map((k) => this.CloudinaryService.uploadFiles(k));
            let urlArr = [];
            try {
                const response = await Promise.all(promiseFile);
                urlArr = response.map((k) => k.url);
            }
            catch (cloudinaryError) {
                console.error('Cloudinary error when creating camping:', cloudinaryError);
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.CLOUDINARY);
            }
            return await this.prisma.$transaction(async (tx) => {
                const createdCamping = await tx.camping.create({
                    data: {
                        ...rest,
                        user: { connect: { id: userId } },
                        location: {
                            create: { ...location },
                        },
                        pricing: { create: pricing },
                        amenities: {
                            connectOrCreate: amenities.map((amenity) => {
                                if (amenity.id) {
                                    return {
                                        where: { id: amenity.id },
                                        create: {
                                            name: `TEMP-${amenity.id}`,
                                            available: true,
                                        },
                                    };
                                }
                                return {
                                    where: { id: -1 },
                                    create: {
                                        name: amenity.name,
                                        available: amenity.available ?? true,
                                    },
                                };
                            }),
                        },
                        media: {
                            create: urlArr.map((mediaDto) => ({
                                url: mediaDto,
                                type: 'image',
                            })),
                        },
                        nearbyAttractions: { create: nearbyAttractions },
                        limitCamping: { create: { maxTents: limitCamping.maxTents, maxUsers: limitCamping.maxUsers } },
                    },
                    include: {
                        location: true,
                        pricing: {
                            select: {
                                id: true,
                                tarifa: true,
                                pricePerNight: true,
                                campingId: false,
                            },
                        },
                        amenities: true,
                        media: true,
                        nearbyAttractions: true,
                        limitCamping: true,
                    },
                });
                this.campingGateway.notifyNewCamping(createdCamping);
                this.logger.log(`Camping created successfully: ${createdCamping.name}`);
                this.logger.log(`Attempting to create camping: ${createdCamping.name}`);
                return (0, class_transformer_1.plainToInstance)(create_camping_dto_1.CampingResponseDto, createdCamping, {
                    excludeExtraneousValues: true,
                });
            });
        }
        catch (error) {
            console.error('Error creating camping:', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.BadRequestException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DUPLICATE);
            }
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error creating camping');
            }
            throw error;
        }
    }
    async update(id, data, userId, files) {
        try {
            const { location, pricing, amenities, nearbyAttractions, limitCamping, ...rest } = data;
            const camping = await this.prisma.camping.findUnique({
                where: { id },
                include: {
                    user: true,
                    location: true,
                    pricing: true,
                    amenities: true,
                    nearbyAttractions: true,
                    limitCamping: true,
                    media: true,
                },
            });
            if (!camping) {
                throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND(id));
            }
            if (camping.userId !== userId) {
                throw new common_1.BadRequestException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_AUTHORIZED);
            }
            const updatePromises = [];
            const transaction = await this.prisma.$transaction(async (tx) => {
                if (files && files.length > 0) {
                    await tx.media.deleteMany({
                        where: { campingId: id },
                    });
                    const promiseFile = files.map((k) => this.CloudinaryService.uploadFiles(k));
                    try {
                        const response = await Promise.all(promiseFile);
                        const urlArr = response.map((k) => k.url);
                        updatePromises.push(tx.media.createMany({
                            data: urlArr.map((url) => ({
                                url: url,
                                type: 'image',
                                campingId: id,
                            })),
                        }));
                    }
                    catch (cloudinaryError) {
                        console.error('Cloudinary error when updating camping:', cloudinaryError);
                        throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.CLOUDINARY);
                    }
                }
                if (location) {
                    updatePromises.push(tx.location.update({
                        where: { id: camping.locationId },
                        data: { ...location },
                    }));
                }
                if (pricing) {
                    await tx.pricing.deleteMany({
                        where: {
                            campingId: id,
                        },
                    });
                    updatePromises.push(tx.pricing.createMany({
                        data: pricing.map((price) => ({
                            ...price,
                            campingId: id,
                            tarifa: price.tarifa || 'carpa',
                            pricePerNight: price.pricePerNight !== undefined ? price.pricePerNight : 0,
                        })),
                    }));
                }
                if (amenities) {
                    updatePromises.push(tx.camping.update({
                        where: { id: id },
                        data: {
                            amenities: {
                                set: [],
                            },
                        },
                    }));
                    const amenityConnectOrCreate = amenities.map((amenity) => {
                        if (amenity.id) {
                            return {
                                where: { id: amenity.id },
                                create: {
                                    name: `TEMP-${amenity.id}`,
                                    available: true,
                                },
                            };
                        }
                        return {
                            where: { id: -1 },
                            create: {
                                name: amenity.name,
                                available: amenity.available ?? true,
                            },
                        };
                    });
                    updatePromises.push(tx.camping.update({
                        where: { id: id },
                        data: {
                            amenities: {
                                connectOrCreate: amenityConnectOrCreate,
                            },
                        },
                    }));
                }
                if (nearbyAttractions) {
                    await tx.nearbyAttraction.deleteMany({
                        where: {
                            campingId: id,
                        },
                    });
                    updatePromises.push(tx.nearbyAttraction.createMany({
                        data: nearbyAttractions.map((attraction) => ({
                            ...attraction,
                            campingId: id,
                            name: attraction.name || 'Default Attraction Name',
                        })),
                    }));
                }
                if (limitCamping) {
                    updatePromises.push(tx.limitCamping.update({
                        where: { id: camping.limitCampingId },
                        data: { ...limitCamping },
                    }));
                }
                updatePromises.push(tx.camping.update({
                    where: { id: id },
                    data: { ...rest },
                }));
                await Promise.all(updatePromises);
                const updatedCamping = await tx.camping.findUnique({
                    where: { id },
                    include: {
                        location: true,
                        pricing: true,
                        amenities: true,
                        nearbyAttractions: true,
                        limitCamping: true,
                        media: true,
                    },
                });
                return (0, class_transformer_1.plainToInstance)(create_camping_dto_1.CampingResponseDto, updatedCamping, {
                    excludeExtraneousValues: true,
                });
            });
            this.logger.log(`Attempting to update camping: ${transaction.name}`);
            this.logger.log(`Camping updated successfully: ${transaction.name}`);
            return transaction;
        }
        catch (error) {
            console.error('Error creating camping:', error);
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error creating camping');
            }
            throw error;
        }
    }
    async createReviews(userId, createReviewDtos) {
        try {
            return Promise.all(createReviewDtos.map(async (dto) => {
                const camping = await this.prisma.camping.findUnique({ where: { id: dto.campingId } });
                if (!camping)
                    throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND);
                const hasReservation = await this.prisma.reservation.findFirst({
                    where: { userId, campingId: dto.campingId, status: 'CONFIRMED' },
                });
                if (!hasReservation)
                    throw new common_1.ForbiddenException('You must have a confirmed reservation for this camping');
                this.logger.log(`Attempting to create review for camping: ${dto.campingId}`);
                this.logger.log(`Review created successfully: ${dto.name}`);
                return this.prisma.review.create({
                    data: {
                        campingId: dto.campingId,
                        userId,
                        name: dto.name,
                        comment: dto.comment,
                        rating: dto.rating,
                        profilePic: dto.profilePic,
                        date: dto.date,
                    },
                    select: {
                        id: true,
                        campingId: true,
                        name: true,
                        date: true,
                        comment: true,
                        rating: true,
                        profilePic: true,
                    },
                });
            }));
        }
        catch (error) {
            console.error('Error creating review:', error);
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND);
            }
            if (error instanceof common_1.ForbiddenException) {
                throw new common_1.ForbiddenException('You must have a confirmed reservation for this camping');
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error creating review');
            }
            throw error;
        }
    }
    async getReviewsByCampingId(campingId) {
        try {
            const camping = await this.prisma.camping.findUnique({ where: { id: campingId } });
            if (!camping)
                throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND(campingId));
            return this.prisma.review.findMany({
                where: { campingId },
                select: {
                    id: true,
                    campingId: true,
                    name: true,
                    date: true,
                    comment: true,
                    rating: true,
                    profilePic: true,
                },
            });
        }
        catch (error) {
            console.error('Error getting reviews:', error);
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_1.ServiceUnavailableException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.DATABASE);
            }
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(camping_error_messages_1.CAMPING_ERROR_MESSAGES.PRISMA.NOT_FOUND(campingId));
            }
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error getting reviews');
            }
            throw error;
        }
    }
    async addFavourite(createFavouriteDto) {
        try {
            const { campingId, userId } = createFavouriteDto;
            const camping = await this.prisma.camping.findUnique({ where: { id: campingId } });
            if (!camping) {
                throw new common_1.NotFoundException('Camping not found');
            }
            const exists = await this.prisma.favourites.findUnique({
                where: {
                    userId_campingId: {
                        userId,
                        campingId,
                    },
                },
            });
            if (exists) {
                throw new common_1.BadRequestException('This camping is already a favorite');
            }
            this.logger.log(`Attempting to add favorite for camping: ${campingId}`);
            this.logger.log(`Favorite added successfully: ${campingId}`);
            await this.prisma.favourites.create({
                data: {
                    userId,
                    campingId,
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.InternalServerErrorException) {
                console.error('Error adding camping to favorites:', error);
                throw new common_1.InternalServerErrorException('Error adding camping to favorites');
            }
            throw error;
        }
    }
    async removeFavourite(userId, campingId) {
        try {
            const favourite = await this.prisma.favourites.findUnique({
                where: {
                    userId_campingId: {
                        userId,
                        campingId,
                    },
                },
            });
            if (!favourite) {
                throw new common_1.NotFoundException('Favorite not found');
            }
            await this.prisma.favourites.delete({
                where: {
                    userId_campingId: {
                        userId,
                        campingId,
                    },
                },
            });
        }
        catch (error) {
            console.error('Error removing camping fromfavorites:', error);
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error removing camping from favorites');
            }
            throw error;
        }
    }
    async getFavouritesByUser(userId) {
        try {
            const favourites = await this.prisma.favourites.findMany({
                where: { userId },
                include: {
                    camping: {
                        include: {
                            location: true,
                            media: true,
                            pricing: true,
                            amenities: true,
                            nearbyAttractions: true,
                            limitCamping: true,
                        },
                    },
                },
            });
            if (favourites.length === 0) {
                throw new common_1.NotFoundException('There are no favorites campings for this user');
            }
            return favourites.map((fav) => fav.camping);
        }
        catch (error) {
            console.error('Error getting favorites by user:', error);
            if (error instanceof common_1.InternalServerErrorException) {
                throw new common_1.InternalServerErrorException('Error getting favorites by user');
            }
            throw error;
        }
    }
};
exports.CampingsService = CampingsService;
exports.CampingsService = CampingsService = CampingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        camping_gateway_1.CampingGateway,
        cloudinary_service_1.CloudinaryService])
], CampingsService);
//# sourceMappingURL=campings.service.js.map