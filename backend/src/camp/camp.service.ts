import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Camp from './camp.entity';
import { Repository } from 'typeorm';
import { CreateCampDto } from './dto/create-camp.dto';

@Injectable()
export class CampService {

    constructor(
        @InjectRepository(Camp)
        private campRepository: Repository<Camp>
    ) { }

    async createCamp(createCampdto: CreateCampDto){
        return this.campRepository.save(createCampdto)
    }

    async getAll(){
        return this.campRepository.find()
    }

    

}
