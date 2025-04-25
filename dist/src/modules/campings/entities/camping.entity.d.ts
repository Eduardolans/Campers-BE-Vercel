import { Prisma } from '@prisma/client';
export declare const campingWithDetails: {
    include: {
        amenities: true;
        location: true;
        pricing: true;
        nearbyAttractions: true;
    };
};
export type CampingWithDetails = Prisma.CampingGetPayload<typeof campingWithDetails>;
