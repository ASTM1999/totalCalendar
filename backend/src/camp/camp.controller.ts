import { Controller, Body, Get, Post } from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';

@Controller('camp')
export class CampController {

    constructor(
        private campService: CampService
    ) { }

    @Get()
    async get() {
        return this.campService.getAll()
    }
    
    @Post()
    async createCamp(@Body() createCampdto: CreateCampDto) {
        return this.campService.createCamp(createCampdto)
    }
}
