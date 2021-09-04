import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoommateController } from './roommate.controller';
import { RoommateService } from './roommate.service';
import { Roommate, RoommateSchema } from './schemas/roommate.schema';
import { Counter, CounterSchema } from '../Housing/schemas/counter.schema';
import { UserService } from 'src/User/user.service';
import { User, UserSchema } from 'src/User/schemas/user.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roommate.name, schema: RoommateSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule
  ],
  controllers: [RoommateController],
  providers: [RoommateService, UserService],
})
export class RoommateModule {}