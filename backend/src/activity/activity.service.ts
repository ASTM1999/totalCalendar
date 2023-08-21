import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Activity from './activity.entity';


@Injectable()
export class ActivityService {

    constructor(
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
    ) { }



    async findActivity() {
        return this.activityRepository.find()
    }
}
