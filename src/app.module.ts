import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HousingModule } from './Housing/housing.module';
import { UserModule } from './User/user.module';
import { DemandModule } from './Demand/demand.module';
import { RoommateModule } from './Roommate/roommate.module';

@Module({
  imports: [
    HousingModule,
    UserModule,
    DemandModule,
    RoommateModule,
    MongooseModule.forRoot('mongodb://localhost:27017/sdpt_housing')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
