import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Announcement from './announcement.entity';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementService {
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>


    async getAnnouncement() {
        return this.announcementRepository.find()
    }
    async createAnouncement(createAnnouncementDto: CreateAnnouncementDto) {
        return this.announcementRepository.save(createAnnouncementDto)
    }

}
