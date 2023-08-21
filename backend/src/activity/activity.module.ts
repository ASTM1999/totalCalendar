import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Activity from './activity.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Activity])
    // TypeOrmModule.forFeature([Activity, Camp, Announcement])
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule { }
