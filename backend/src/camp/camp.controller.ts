import { Controller, Body, Get, Post, Put, Param } from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { UpdateCampDto } from './dto/update-camp.dto';

@Controller('camp')
export class CampController {

    constructor(
        private campService: CampService
    ) { }
    
    @Put(':id/update')
    async updateActivity(
        @Param('id', ParseObjectIdPipe) activityId: ObjectId,
        @Body() updateCampDto: UpdateCampDto
    ) {
        const update = await this.campService.update(activityId, updateCampDto)
        return update
    }



    @Get()
    async get() {
        return this.campService.getAll()
    }

    @Post()
    async createCamp(@Body() createCampdto: CreateCampDto) {
        createCampdto.userOwner = new ObjectId(createCampdto.userOwner)
        return this.campService.createCamp(createCampdto)
    }
}
