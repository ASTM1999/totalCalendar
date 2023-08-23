import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ParseObjectIdPipe } from 'src/common/pipes';

import { UpdateActivityDto } from './dto/update-activity.dto';
import { ObjectId } from 'mongodb';



@Controller('activity')
export class ActivityController {
    constructor(
        private activityService: ActivityService,

    ) { }
    @Put(':id/update')
    async updateActivity(
        @Param('id', ParseObjectIdPipe) activityId: ObjectId,
        @Body() updateActivityDto: UpdateActivityDto
    ) {
        const update = await this.activityService.update(activityId, updateActivityDto)
        return update
    }

    @Get()
    async getActivity() {
        return this.activityService.findActivity()
    }

    @Post()
    async createActivity(@Body() createActivityDto: CreateActivityDto) {
        createActivityDto.userOwner = new ObjectId(createActivityDto.userOwner)
        return this.activityService.createActivity(createActivityDto);
    }
}

