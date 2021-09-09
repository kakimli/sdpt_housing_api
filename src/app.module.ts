import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HousingModule } from './Housing/housing.module';
import { UserModule } from './User/user.module';
import { DemandModule } from './Demand/demand.module';
import { RoommateModule } from './Roommate/roommate.module';
import config from './config';

@Module({
  imports: [
    HousingModule,
    UserModule,
    DemandModule,
    RoommateModule,
    MongooseModule.forRoot(config.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
