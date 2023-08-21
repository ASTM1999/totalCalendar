import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Activity from './activity.entity';
import { Repository } from 'typeorm';
import Announcement from '../announcement/announcement.entity';
import Camp from '../camp/camp.entity';
import { CreateAnnouncementDto } from '../announcement/dto/create-announcement.dto';

@Injectable()
export class ActivityService {

    constructor(
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,


        @InjectRepository(Camp)
        private campRepository: Repository<Camp>,
    ) { }



    async findActivity() {
        return this.activityRepository.find()
    }
    //     async getActivity() {
    //         const result = await this.activityRepository.
    //     }
}
