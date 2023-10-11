import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Announcement from './announcement.entity';
import { ObjectId } from 'mongodb';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementService {
    constructor(
        @InjectRepository(Announcement)
        private announcementRepository: Repository<Announcement>,

    ) { }


    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.announcementRepository.delete(id)
            return result.affected > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async update(id: ObjectId, updateActivityDto: UpdateAnnouncementDto) {
        try {
            const user = await this.announcementRepository.findOne({ where: { _id: new ObjectId(id) } })
            if (!user) {
                return null //ถ้าไม่พยให้ return null
            }
            if (updateActivityDto.startDate) {
                user.startDate = updateActivityDto.startDate
            }
            if (updateActivityDto.endDate) {
                user.endDate = updateActivityDto.endDate
            }
            if (updateActivityDto.title) {
                user.title = updateActivityDto.title
            }
            if (updateActivityDto.detail) {
                user.detail = updateActivityDto.detail
            }
            const update = await this.announcementRepository.save(user)
            console.log("update success")
            console.log(update)
            return update
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async getAnnouncement() {
        return this.announcementRepository.find()
    }

    async createAnouncement(createAnnouncementDto: CreateAnnouncementDto) {
        return this.announcementRepository.save(createAnnouncementDto)
    }

}
