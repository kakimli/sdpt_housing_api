import { CreateRoommateDto } from "./dto/create-roommate.dto";
import { RoommateService } from "./roommate.service";
import { SearchRoommateDto } from "./dto/search-roommate.dto";
import { UserService } from "src/User/user.service";
export declare class RoommateController {
    private roommateService;
    private userService;
    constructor(roommateService: RoommateService, userService: UserService);
    private readonly logger;
    getAllPosts(page: number, limit: number): Promise<import("./schemas/roommate.schema").Roommate[]>;
    searchPosts(searchRoommateDto: SearchRoommateDto): Promise<import("./schemas/roommate.schema").RoommateDocument[]>;
    getPostById(id: number): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/roommate.schema").Roommate;
        msg?: undefined;
    }>;
    createPost(createRoommateDto: CreateRoommateDto, session: Record<string, any>): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/roommate.schema").Roommate;
        msg?: undefined;
    }>;
}
