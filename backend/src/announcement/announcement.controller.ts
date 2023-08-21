import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementService } from './announcement.service';

@Controller('announcement')
export class AnnouncementController {
    constructor(
        private announcementService: AnnouncementService
    ){}

    @Get()
    async getAnnouncement() {
        return this.announcementService.getAnnouncement()
    }


    @Post()
    async createAnouncement(
        @Body() createAnnouncementDto: CreateAnnouncementDto) {
        console.log(createAnnouncementDto)
        return this.announcementService.createAnouncement(createAnnouncementDto)
    }
}
