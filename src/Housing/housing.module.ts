import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HousingController } from './housing.controller';
import { HousingService } from './housing.service';
import { Housing, HousingSchema } from './schemas/housing.schema';
import { Counter, CounterSchema } from './schemas/counter.schema';
import { UserService } from 'src/User/user.service';
import { User, UserSchema } from 'src/User/schemas/user.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Housing.name, schema: HousingSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule
  ],
  controllers: [HousingController],
  providers: [HousingService, UserService],
})
export class HousingModule {}