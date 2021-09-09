import { CreateDemandDto } from "./dto/create-demand.dto";
import { DemandService } from "./demand.service";
import { SearchDemandDto } from "./dto/search-demand.dto";
import { UserService } from "src/User/user.service";
export declare class DemandController {
    private demandService;
    private userService;
    constructor(demandService: DemandService, userService: UserService);
    getAllPosts(): Promise<import("./schemas/demand.schema").Demand[]>;
    searchPosts(searchDemandDto: SearchDemandDto): Promise<import("./schemas/demand.schema").DemandDocument[]>;
    getPostById(id: number): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/demand.schema").Demand;
        msg?: undefined;
    }>;
    createPost(createDemandDto: CreateDemandDto, session: Record<string, any>): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/demand.schema").Demand;
        msg?: undefined;
    }>;
}
