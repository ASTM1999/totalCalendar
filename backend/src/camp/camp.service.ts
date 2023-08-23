import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import Camp from './camp.entity';

import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import Comment from 'src/comment/comment.entity';

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
            if (updateCampDto.time) {
                user.time = updateCampDto.time
            }
            if (updateCampDto.title) {
                user.title = updateCampDto.title
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

    async getAll() {
        return this.campRepository.find()
    }
}
