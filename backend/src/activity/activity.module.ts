import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Camp from './camp.entity';
import ActivityEntity from './activity.entity';
import Announcement from './announcement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity, Camp, Announcement])
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule { }
