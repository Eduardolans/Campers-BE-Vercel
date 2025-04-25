import { CampingResponseDto } from './dto/create-camping.dto';
import { CampingsService } from './campings.service';
import { ReviewResponseDto } from './dto/review-response.dto';
import { createReviewDto } from './dto/create-review.dto';
export declare class CampingsController {
    private readonly campingsService;
    constructor(campingsService: CampingsService);
    create(req: any, createCampingDto: string, files: Express.Multer.File[]): Promise<{
        id: number;
        name: string;
        description: string;
        contactPhone: string;
        locationId: number;
        limitCampingId: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<import("./dto/create-camping.dto").PaginatedResponseDto<CampingResponseDto>>;
    remove(id: string, req: any): Promise<{
        id: number;
        name: string;
        description: string;
        contactPhone: string;
        locationId: number;
        limitCampingId: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, req: any, updateCampingDto: string, files?: Express.Multer.File[]): Promise<{
        id: number;
        name: string;
        description: string;
        contactPhone: string;
        locationId: number;
        limitCampingId: number;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createReviews(body: createReviewDto, req: any): Promise<ReviewResponseDto[]>;
    getReviews(campingId: string): Promise<ReviewResponseDto[]>;
    addFavourite(campingId: string, req: any): Promise<{
        message: string;
    }>;
    removeFavourite(campingId: string, req: any): Promise<{
        message: string;
    }>;
    getFavourites(req: any): Promise<({
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
