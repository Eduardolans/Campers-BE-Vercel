import { CampingSearchService } from './campings-search.service';
import { SearchCampingDto } from './dto/search-camping.dto';
export declare class CampingsSearchController {
    private readonly searchService;
    constructor(searchService: CampingSearchService);
    search(searchParams: SearchCampingDto): Promise<unknown>;
}
