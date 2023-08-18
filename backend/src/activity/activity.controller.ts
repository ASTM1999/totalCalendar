import { Controller } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { InjectRepository } from '@nestjs/typeorm';
import ActivityEntity from './activity.entity';
import { Repository } from 'typeorm';
import Camp from './camp.entity';
import Announcement from './announcement.entity';

@Controller('activity')
export class ActivityController {
    constructor(
        private activityService: ActivityService,
        @InjectRepository(ActivityEntity)
        private readonly activityRepository: Repository<ActivityEntity>,
        @InjectRepository(Camp)
        private readonly campRepository: Repository<Camp>,
        @InjectRepository(Announcement)
        private readonly announcementRepository: Repository<Announcement>,
    ) { }
}

