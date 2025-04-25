declare class UpdateLocationDto {
    campingAddress?: string;
    mapLink?: string;
}
declare class UpdatePricingDto {
    pricePerNight?: number;
    tarifa?: string;
}
declare class UpdateAmenityDto {
    id?: number;
    name?: string;
    available?: boolean;
}
declare class UpdateNearbyAttractionDto {
    name?: string;
}
declare class UpdateLimitCampingDto {
    maxTents?: number;
    maxUsers?: number;
}
export declare class UpdateCampingDto {
    name?: string;
    location?: UpdateLocationDto;
    description?: string;
    contactPhone?: string;
    pricing?: UpdatePricingDto[];
    amenities?: UpdateAmenityDto[];
    nearbyAttractions?: UpdateNearbyAttractionDto[];
    limitCamping?: UpdateLimitCampingDto;
}
export {};
