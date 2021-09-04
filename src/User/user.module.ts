import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { HttpModule } from '@nestjs/axios';
import { Counter, CounterSchema } from 'src/Housing/schemas/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}