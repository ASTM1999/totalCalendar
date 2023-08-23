import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import Comment from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Controller('camp')
export class CampController {

    constructor(
        private campService: CampService,
        private commentService: CommentService,
    ) { }
    
    @Delete(':activityId/comment/:id/delete')
    async deleteComment(
        @Param('id') id: string) {
        return this.commentService.delete(id)
    }

    @Get()
    async findComment(): Promise<Comment[]> {
        return this.commentService.findComment()
    }

    @Put(':activityId/comment/:id/update')
    async updateComment(
        // @Param('activityId', ParseObjectIdPipe) activityId: ObjectId,
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() updateCommentDTO: UpdateCommentDto,
    ) {
        console.log("Update controller")
        console.log("id", id)
        console.log("DTO", updateCommentDTO)
        console.log("Update controller")
        const update = await this.commentService.updateComment(id, updateCommentDTO)
        return update
    }

    @Post(':activityId/comment')
    async createComment(
        @Param('activityId', ParseObjectIdPipe) activityId: ObjectId,
        @Body() createCommentDto: CreateCommentDto) {
        createCommentDto.userId = new ObjectId(createCommentDto.userId)
        return this.commentService.createComment(activityId, createCommentDto)
    }

    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        return this.campService.delete(id)
    }

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
