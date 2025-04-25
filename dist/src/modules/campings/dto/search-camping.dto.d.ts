export declare class LocationDto {
    campingAddress: string;
    mapLink: string;
}
export declare class PricingDto {
    pricePerNight: number;
    tarifa: string;
}
export declare class AmenityDto {
    name?: string;
    available?: boolean;
}
declare class MediaDto {
    url: string;
    type: string;
}
export declare class NearbyAttractionDto {
    name: string;
}
declare class LimitCampingDto {
    maxTents: number;
    maxUsers: number;
}
export declare class SearchCampingDto {
    name?: string;
    pricing?: PricingDto[];
    pricePerNight?: number;
    tarifa?: string;
    campingAddress?: string;
    mapLink?: string;
    amenities?: string[];
    nearbyAttractions?: string[];
    maxUsers?: number;
    maxTents?: number;
    page?: number;
    limit?: number;
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
    nearbyAttractions: NearbyAttractionDto[];
    limitCamping: LimitCampingDto;
    userId: string;
    locationId: number;
    limitCampingId: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}
export {};
