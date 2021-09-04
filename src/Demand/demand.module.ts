import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { Demand, DemandSchema } from './schemas/demand.schema';
import { Counter, CounterSchema } from '../Housing/schemas/counter.schema';
import { UserService } from 'src/User/user.service';
import { User, UserSchema } from 'src/User/schemas/user.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demand.name, schema: DemandSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule
  ],
  controllers: [DemandController],
  providers: [DemandService, UserService],
})
export class DemandModule {}