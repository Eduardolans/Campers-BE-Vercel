import { PrismaService } from '../../prisma/prisma.service';
import { CampingResponseDto, CreateCampingDto, PaginatedResponseDto } from './dto/create-camping.dto';
import { Camping } from '@prisma/client';
import { CampingGateway } from '../webSockets/camping.gateway';
import { createReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFavouritesDto } from './dto/favourites-camping.dto';
import { UpdateCampingDto } from './dto/update-camping.dto';
export declare class CampingsService {
    private prisma;
    private readonly campingGateway;
    private readonly CloudinaryService;
    private readonly logger;
    constructor(prisma: PrismaService, campingGateway: CampingGateway, CloudinaryService: CloudinaryService);
    findAll(page?: number, limit?: number): Promise<PaginatedResponseDto<CampingResponseDto>>;
    remove(id: number, userId: string): Promise<Camping>;
    create(data: CreateCampingDto, userId: string, files: Express.Multer.File[]): Promise<Camping>;
    update(id: number, data: UpdateCampingDto, userId: string, files?: Express.Multer.File[]): Promise<Camping>;
    createReviews(userId: string, createReviewDtos: createReviewDto[]): Promise<ReviewResponseDto[]>;
    getReviewsByCampingId(campingId: number): Promise<ReviewResponseDto[]>;
    addFavourite(createFavouriteDto: CreateFavouritesDto): Promise<void>;
    removeFavourite(userId: string, campingId: number): Promise<void>;
    getFavouritesByUser(userId: string): Promise<({
        location: {
            id: number;
            campingAddress: string;
            mapLink: string;
        };
        pricing: {
            id: number;
            pricePerNight: number;
            tarifa: string;
            campingId: number;
        }[];
        limitCamping: {
            id: number;
            maxTents: number;
            maxUsers: number;
        };
        media: {
            id: number;
            type: string;
            url: string;
            campingId: number;
        }[];
        amenities: {
            id: number;
            name: string;
            available: boolean;
        }[];
        nearbyAttractions: {
            id: number;
            name: string;
            campingId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        contactPhone: string;
        locationId: number;
        limitCampingId: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
