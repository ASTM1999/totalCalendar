import { Controller, Get, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';


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

