import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Demand, DemandDocument } from './schemas/demand.schema';
import { Counter, CounterDocument } from '../Housing/schemas/counter.schema';
import { SearchDemandDto } from './dto/search-demand.dto';

@Injectable()
export class DemandService {
  constructor(
    @InjectModel(Demand.name) private demandModel: Model<DemandDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
  ) {}

  async create(params: any): Promise<Demand> {
    const createdDemand = new this.demandModel(params);
    return createdDemand.save();
  }

  async findAll(): Promise<Demand[]> {
    return this.demandModel.find().exec();
  }

  async getPostById(postId: number): Promise<Demand> {
    const post = await this.demandModel.findOne({ postId });
    return post;
  }

  async searchPost(sdd: SearchDemandDto) {
    const query: {[index: string]: any} = {};
    if (sdd.title) query.title = new RegExp(sdd.title, 'i');
    const posts = await this.demandModel.find(query);
    return posts;
  }

  async getCountAndIncrement(): Promise<number> {
    const query = { name: `demand` };
    const update = { $inc: { count: 1 } };
    const options = { 
      upsert: true,
      new: true,
      setDefaultsOnInsert: true 
    };
    const demandIdCounter = 
      await this.counterModel.findOneAndUpdate(query, update, options).lean();
    return demandIdCounter.count;
  }
}
