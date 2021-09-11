import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(RoommateService.name);

  async create(params: any): Promise<Roommate> {
    this.logger.log(`Create post: postId ${params.postId} authorId ${params.authorId}`);
    const createdRoommate = new this.roommateModel(params);
    return createdRoommate.save();
  }

  async findAll(page, limit): Promise<Roommate[]> {
    this.logger.log(`Find all posts: page ${page} limit ${limit}`);
    return this.roommateModel.find()
      .sort({ createdTime: -1 })
      .skip(page * limit).limit(limit).exec();
  }

  async getPostById(postId: number): Promise<Roommate> {
    this.logger.log(`Get specific post: postId ${postId}`);
    const post = await this.roommateModel.findOne({ postId });
    return post;
  }

  async searchPost(sdd: SearchRoommateDto) {
    const query: {[index: string]: any} = {};
    if (sdd.title) query.title = new RegExp(sdd.title, 'i');
    this.logger.log(`Search posts: query ${JSON.stringify(query)}`)
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
