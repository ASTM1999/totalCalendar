import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Camp from '../camp/camp.entity';
import Activity from './activity.entity';
import Announcement from '../announcement/announcement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, Camp, Announcement])
    // TypeOrmModule.forFeature([Activity, Camp, Announcement])
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule { }
