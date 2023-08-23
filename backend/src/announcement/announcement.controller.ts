import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { AnnouncementService } from './announcement.service';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { ObjectId } from 'mongodb';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';


@Controller('announcement')
export class AnnouncementController {
    constructor(
        private announcementService: AnnouncementService
    ) { }
    @Put(':id/update')
    async updateActivity(
        @Param('id', ParseObjectIdPipe) activityId: ObjectId,
        @Body() updateAnnouncement: UpdateAnnouncementDto
    ) {
        const update = await this.announcementService.update(activityId, updateAnnouncement)
        return update
    }

    @Get()
    async getAnnouncement() {
        return this.announcementService.getAnnouncement()
    }


    @Post()
    async createAnouncement(
        @Body() createAnnouncementDto: CreateAnnouncementDto) {
        createAnnouncementDto.userOwner = new ObjectId(createAnnouncementDto.userOwner)
        return this.announcementService.createAnouncement(createAnnouncementDto)
    }
}
