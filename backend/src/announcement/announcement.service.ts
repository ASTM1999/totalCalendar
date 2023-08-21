import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

import Announcement from './announcement.entity';

@Injectable()
export class AnnouncementService {
    constructor(
        @InjectRepository(Announcement)
        private announcementRepository: Repository<Announcement>,
    ) { }


    async getAnnouncement() {
        return this.announcementRepository.find()
    }

    async createAnouncement(createAnnouncementDto: CreateAnnouncementDto) {
        return this.announcementRepository.save(createAnnouncementDto)
    }

}
