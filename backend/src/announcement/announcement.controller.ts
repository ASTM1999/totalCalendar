import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementService } from './announcement.service';

@Controller('announcement')
export class AnnouncementController {
    constructor(
        private announceService: AnnouncementService
    ){}

    @Get()
    async getAnnouncement() {
        return this.announceService.getAnnouncement()
    }


    @Post()
    async createAnouncement(
        @Body() createAnnouncementDto: CreateAnnouncementDto) {
        console.log(createAnnouncementDto)
        return this.announceService.createAnouncement(createAnnouncementDto)
    }
}
