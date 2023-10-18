import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import Camp from './camp.entity';

@Injectable()
export class CampService {
    constructor(
        @InjectRepository(Camp)
        private campRepository: Repository<Camp>,
    ) { }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.campRepository.delete(id)
            return result.affected > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async update(id: ObjectId, updateCampDto: UpdateCampDto) {
        try {
            const user = await this.campRepository.findOne({ where: { _id: new ObjectId(id) } })
            if (!user) {
                return null //ถ้าไม่พยให้ return null
            }
            if (updateCampDto.startDate) {
                user.startDate = updateCampDto.startDate
            }
            if (updateCampDto.endDate) {
                user.endDate = updateCampDto.endDate
            }
            if (updateCampDto.title) {
                user.title = updateCampDto.title
            }
            if (updateCampDto.detail) {
                user.detail = updateCampDto.detail
            }
            const update = await this.campRepository.save(user)
            console.log("update success")
            console.log(update)
            return update
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async createCamp(createCampdto: CreateCampDto) {
        return this.campRepository.save(createCampdto)
    }

    async getAll(option) {
        try {
            const camp = await this.campRepository.find({ where: { option: option } })
            // console.log(camp)
            return camp
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException("Error get camp")
        }
    }
}
