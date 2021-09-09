import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { HttpService } from '@nestjs/axios';
import { CounterDocument } from 'src/Housing/schemas/counter.schema';
export declare class UserService {
    private userModel;
    private counterModel;
    private httpService;
    constructor(userModel: Model<UserDocument>, counterModel: Model<CounterDocument>, httpService: HttpService);
    requestForOpenId(loginDto: LoginDto): Promise<unknown>;
    createUserIfNotExist(openId: string, username: string): Promise<number>;
    findUser(userId: number): Promise<import("mongoose").LeanDocument<UserDocument>>;
}
