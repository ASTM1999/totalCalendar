import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { AnnouncementService } from './announcement.service';
import { ParseObjectIdPipe } from 'src/common/pipes';
import { ObjectId } from 'mongodb';

import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import { CommentService } from 'src/comment/comment.service';


@Controller('announcement')
export class AnnouncementController {
    constructor(
        private announcementService: AnnouncementService,
        private commentService: CommentService
    ) { }

    @Delete(':activityId/comment/:id/delete')
    async deleteComment(
        @Param('id') id: string) {
        return this.commentService.delete(id)
    }

    @Put(':activityId/comment/:id/update')
    async updateComment(
        // @Param('activityId', ParseObjectIdPipe) activityId: ObjectId,
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() updateCommentDTO: UpdateCommentDto,
    ) {
        console.log("id:", id)
        console.log(updateCommentDTO)
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
        return this.announcementService.delete(id)
    }

    @Put(':id/update')
    async updateActivity(
        @Param('id', ParseObjectIdPipe) activityId: ObjectId,
        @Body() updateAnnouncement: UpdateAnnouncementDto
    ) {
        const update = await this.announcementService.update(activityId, updateAnnouncement)
        return update
    }

    @Get()
    async getAnnouncement() {
        return this.announcementService.getAnnouncement()
    }


    @Post()
    async createAnouncement(
        @Body() createAnnouncementDto: CreateAnnouncementDto) {
        createAnnouncementDto.userOwner = new ObjectId(createAnnouncementDto.userOwner)
        return this.announcementService.createAnouncement(createAnnouncementDto)
    }
}
