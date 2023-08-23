import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Activity from './activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ObjectId } from 'mongodb';
import { UpdateActivityDto } from './dto/update-activity.dto';


@Injectable()
export class ActivityService {

    constructor(
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
    ) { }


    async update(id: ObjectId, updateActivityDto: UpdateActivityDto) {
        try {
            const user = await this.activityRepository.findOne({ where: { _id: new ObjectId(id) } })
            if(!user){
                return null //ถ้าไม่พยให้ return null
            }
            if(updateActivityDto.time){
                user.time = updateActivityDto.time
            }
            if(updateActivityDto.title){
                user.title = updateActivityDto.title
            }
            const update = await this.activityRepository.save(user)
            console.log("update success")
            console.log(update)
            return update
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async createActivity(createActivityDto: CreateActivityDto) {
        return this.activityRepository.save(createActivityDto)
    }

    async findActivity() {
        return this.activityRepository.find()
    }
}
