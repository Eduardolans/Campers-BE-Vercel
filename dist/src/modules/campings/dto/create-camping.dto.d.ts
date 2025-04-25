declare class LocationDto {
    campingAddress: string;
    mapLink: string;
}
declare class PricingDto {
    pricePerNight: number;
    tarifa: string;
}
declare class AmenityDto {
    id?: number;
    name?: string;
    available?: boolean;
}
declare class MediaDto {
    url: string;
    type: string;
}
declare class NearbyAttractionDto {
    name: string;
}
declare class LimitCampingDto {
    maxTents: number;
    maxUsers: number;
}
export declare class CreateCampingDto {
    name: string;
    location: LocationDto;
    description: string;
    contactPhone: string;
    pricing: PricingDto;
    amenities?: AmenityDto[];
    nearbyAttractions?: NearbyAttractionDto[];
    limitCamping: {
        maxTents: number;
        maxUsers: number;
    };
}
export declare class CampingResponseDto {
    id: number;
    name: string;
    description: string;
    location: LocationDto;
    contactPhone: string;
    media: MediaDto[];
    pricing: PricingDto;
    amenities: string[];
    limitCamping: LimitCampingDto;
    userId: string;
    campingId: number;
    nearbyAttractions: NearbyAttractionDto[];
    locationId: number;
    limitCampingId: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export {};
