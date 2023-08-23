import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Camp from './camp.entity';
import { Repository } from 'typeorm';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CampService {

    constructor(
        @InjectRepository(Camp)
        private campRepository: Repository<Camp>
    ) { }

    async delete(id: ObjectId, ){

    }
    
    async update(id: ObjectId, updateCampDto: UpdateCampDto) {
        try {
            const user = await this.campRepository.findOne({ where: { _id: new ObjectId(id) } })
            if(!user){
                return null //ถ้าไม่พยให้ return null
            }
            if(updateCampDto.time){
                user.time = updateCampDto.time
            }
            if(updateCampDto.title){
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

    async createCamp(createCampdto: CreateCampDto){
        return this.campRepository.save(createCampdto)
    }

    async getAll(){
        return this.campRepository.find()
    }
}
