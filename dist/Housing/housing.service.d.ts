import { Model } from 'mongoose';
import { Housing, HousingDocument } from './schemas/housing.schema';
import { CounterDocument } from './schemas/counter.schema';
import { SearchHousingDto } from './dto/search-housing.dto';
export declare class HousingService {
    private housingModel;
    private counterModel;
    constructor(housingModel: Model<HousingDocument>, counterModel: Model<CounterDocument>);
    create(params: any): Promise<Housing>;
    findAll(): Promise<Housing[]>;
    getPostById(postId: number): Promise<Housing>;
    searchPost(shd: SearchHousingDto): Promise<HousingDocument[]>;
    getCountAndIncrement(): Promise<number>;
    toTwoDigit(num: number): string;
    getDateString(): string;
}
