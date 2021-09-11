import { Model } from 'mongoose';
import { Demand, DemandDocument } from './schemas/demand.schema';
import { CounterDocument } from '../Housing/schemas/counter.schema';
import { SearchDemandDto } from './dto/search-demand.dto';
export declare class DemandService {
    private demandModel;
    private counterModel;
    constructor(demandModel: Model<DemandDocument>, counterModel: Model<CounterDocument>);
    private readonly logger;
    create(params: any): Promise<Demand>;
    findAll(page: number, limit: number): Promise<Demand[]>;
    getPostById(postId: number): Promise<Demand>;
    searchPost(sdd: SearchDemandDto): Promise<DemandDocument[]>;
    getCountAndIncrement(): Promise<number>;
}
