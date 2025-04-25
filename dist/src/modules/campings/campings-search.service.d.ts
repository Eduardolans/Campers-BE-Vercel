import { PrismaService } from '../../prisma/prisma.service';
import { SearchCampingDto } from './dto/search-camping.dto';
import { Cache } from 'cache-manager';
export declare class CampingSearchService {
    private readonly prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    private readonly campingWithDetails;
    searchCampings(filters: SearchCampingDto): Promise<unknown>;
}
