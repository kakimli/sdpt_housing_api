import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Housing, HousingDocument } from './schemas/housing.schema';
import { Counter, CounterDocument } from './schemas/counter.schema';
import { SearchHousingDto } from './dto/search-housing.dto';

@Injectable()
export class HousingService {
  constructor(
    @InjectModel(Housing.name) private housingModel: Model<HousingDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>
  ) {}

  private readonly logger = new Logger(HousingService.name);

  async create(params: any): Promise<Housing> {
    this.logger.log(`Create post: postId ${params.postId} authorId ${params.authorId}`);
    const createdHousing = new this.housingModel(params);
    return createdHousing.save();
  }

  async findAll(page: number, limit: number): Promise<Housing[]> {
    this.logger.log(`Find all posts: page ${page} limit ${limit}`);
    return this.housingModel.find()
      .sort({ createdTime: -1 })
      .skip(page * limit).limit(limit).exec();
  }

  async getPostById(postId: number): Promise<Housing> {
    this.logger.log(`Get specific post: postId ${postId}`);
    const post = await this.housingModel.findOne({ postId });
    return post;
  }

  async searchPost(shd: SearchHousingDto) {
    const query: {[index: string]: any} = {};
    if (shd.address) query.address = new RegExp(shd.address, 'i');
    if (shd.name) query.name = new RegExp(shd.name, 'i');
    if (shd.size || shd.size === 0) query.size = shd.size;
    if (shd.startTime) query.startTime = { $gte: shd.startTime };
    if (shd.endTime) query.endTime = { $lte: shd.endTime };
    if (shd.price) query.price = shd.price;
    for (const utilName in shd.utilities) {
      if (shd.utilities[utilName] === 1) query[utilName] = 1;
    }
    for (const otherName in shd.other) {
      if (shd.other[otherName] === 1) query[otherName] = 1;
    }
    this.logger.log(`Search posts: query ${JSON.stringify(query)}`)
    const posts = await this.housingModel.find(query).sort({ createdTime: -1 });
    return posts;
  }

  async getCountAndIncrement(): Promise<number> {
    const query = { name: `housing` };
    const update = { $inc: { count: 1 } };
    const options = { 
      upsert: true,
      new: true,
      setDefaultsOnInsert: true 
    };
    const housingIdCounter = 
      await this.counterModel.findOneAndUpdate(query, update, options).lean();
    return housingIdCounter.count;
  }

  toTwoDigit(num: number): string {
    return num < 10 ? `0${num}`: `${num}`;
  }

  getDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}-${this.toTwoDigit(month)}-${this.toTwoDigit(date)}`;
  }
}
