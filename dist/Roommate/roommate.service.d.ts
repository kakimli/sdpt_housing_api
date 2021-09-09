import { Model } from 'mongoose';
import { Roommate, RoommateDocument } from './schemas/roommate.schema';
import { CounterDocument } from '../Housing/schemas/counter.schema';
import { SearchRoommateDto } from './dto/search-roommate.dto';
export declare class RoommateService {
    private roommateModel;
    private counterModel;
    constructor(roommateModel: Model<RoommateDocument>, counterModel: Model<CounterDocument>);
    create(params: any): Promise<Roommate>;
    findAll(): Promise<Roommate[]>;
    getPostById(postId: number): Promise<Roommate>;
    searchPost(sdd: SearchRoommateDto): Promise<RoommateDocument[]>;
    getCountAndIncrement(): Promise<number>;
}
