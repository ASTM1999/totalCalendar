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



    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.activityRepository.delete(id)
            return result.affected > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async update(id: ObjectId, updateActivityDto: UpdateActivityDto) {
        try {
            const res = await this.activityRepository.findOne({ where: { _id: id } })
            console.log("res:", res)
            if (updateActivityDto.startDate) {
                res.startDate = updateActivityDto.startDate
            }
            if (updateActivityDto.endDate) {
                res.endDate = updateActivityDto.endDate
            }
            if (updateActivityDto.title) {
                res.title = updateActivityDto.title
            }
            if (updateActivityDto.detail) {
                res.detail = updateActivityDto.detail
            }
            if (res) {
                res.userOwner = new ObjectId(updateActivityDto.userOwner)
            }
            const update = await this.activityRepository.save(res)
            console.log('updateActivityDto: ', updateActivityDto)
            console.log('res: ', res)
            console.log('update: ', update)
            // return update
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async createActivity(createActivityDto: CreateActivityDto) {
        return this.activityRepository.save(createActivityDto)
    }

    async findActivity(option) {
        return this.activityRepository.find({ where: { option: option } })
    }
}
