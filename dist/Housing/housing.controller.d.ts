/// <reference types="multer" />
import { CreateHousingDto } from "./dto/create-housing.dto";
import { HousingService } from "./housing.service";
import { SearchHousingDto } from "./dto/search-housing.dto";
import { UserService } from "src/User/user.service";
export declare class HousingController {
    private housingService;
    private userService;
    constructor(housingService: HousingService, userService: UserService);
    private readonly logger;
    getAllPosts(page: number, limit: number): Promise<import("./schemas/housing.schema").Housing[]>;
    searchPosts(searchHousingDto: SearchHousingDto): Promise<import("./schemas/housing.schema").HousingDocument[]>;
    uploadFile(file: Express.Multer.File, session: Record<string, any>): Promise<{
        success: boolean;
        data: string;
        msg?: undefined;
    } | {
        success: boolean;
        msg: any;
        data?: undefined;
    }>;
    getPostById(id: number): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/housing.schema").Housing;
        msg?: undefined;
    }>;
    createPost(createHousingDto: CreateHousingDto, session: Record<string, any>): Promise<{
        success: boolean;
        msg: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("./schemas/housing.schema").Housing;
        msg?: undefined;
    }>;
}
