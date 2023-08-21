import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';

import { CreateAnnouncementDto } from '../announcement/dto/create-announcement.dto';

@Controller('activity')
export class ActivityController {
    constructor(
        private activityService: ActivityService,

    ) { }

    @Get()
    async getActivity() {
        return this.activityService.findActivity()
    }

}

