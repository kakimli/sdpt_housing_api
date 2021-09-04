import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { HttpService } from '@nestjs/axios';
import config from '../config';
import { Counter, CounterDocument } from 'src/Housing/schemas/counter.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
    private httpService: HttpService
  ) {}

  async requestForOpenId (loginDto: LoginDto) {
    const api = `https://api.weixin.qq.com/sns/jscode2session`;
    const appid = `appid=${loginDto.appId}`;
    const secret = `secret=${config.APP_SECRET}`;
    const code = `js_code=${loginDto.code}`;
    const url = `${api}?${appid}&${secret}&${code}&grant_type=authorization_code`;
    return new Promise((resolve) => {
      this.httpService.get(url).subscribe((response) => {
        resolve(response)
      })
    });
  }

  async createUserIfNotExist (openId: string, username: string) {
    const user = await this.userModel.findOne({ openId });
    if (!user) {
      const query = { name: `user` };
      const update = { $inc: { count: 1 } };
      const options = { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true 
      };
      const counter = await this.counterModel.findOneAndUpdate(query, update, options).lean();
      const userId = counter.count;
      const createdUser = new this.userModel({ 
        userId,
        openId, 
        username
      });
      createdUser.save();
      return userId;
    }
    return user.userId;
  }

  async findUser (userId: number) {
    const user = await this.userModel.findOne({ userId }).lean();
    return user;
  }
  
}