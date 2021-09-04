import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roommate, RoommateDocument } from './schemas/roommate.schema';
import { Counter, CounterDocument } from '../Housing/schemas/counter.schema';
import { SearchRoommateDto } from './dto/search-roommate.dto';

@Injectable()
export class RoommateService {
  constructor(
    @InjectModel(Roommate.name) private roommateModel: Model<RoommateDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
  ) {}

  async create(params: any): Promise<Roommate> {
    const createdRoommate = new this.roommateModel(params);
    return createdRoommate.save();
  }

  async findAll(): Promise<Roommate[]> {
    return this.roommateModel.find().exec();
  }

  async getPostById(postId: number): Promise<Roommate> {
    const post = await this.roommateModel.findOne({ postId });
    return post;
  }

  async searchPost(sdd: SearchRoommateDto) {
    const query: {[index: string]: any} = {};
    if (sdd.title) query.title = new RegExp(sdd.title, 'i');
    const posts = await this.roommateModel.find(query);
    return posts;
  }

  async getCountAndIncrement(): Promise<number> {
    const query = { name: `roommate` };
    const update = { $inc: { count: 1 } };
    const options = { 
      upsert: true,
      new: true,
      setDefaultsOnInsert: true 
    };
    const roommateIdCounter = 
      await this.counterModel.findOneAndUpdate(query, update, options).lean();
    return roommateIdCounter.count;
  }
}
