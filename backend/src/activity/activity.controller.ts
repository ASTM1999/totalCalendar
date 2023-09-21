import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ParseObjectIdPipe } from 'src/common/pipes';

import { UpdateActivityDto } from './dto/update-activity.dto';
import { ObjectId } from 'mongodb';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import { CommentService } from 'src/comment/comment.service';



@Controller('activity')
export class ActivityController {
    constructor(
        private activityService: ActivityService,
        public commentService: CommentService,
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
        return this.activityService.delete(id)
    }

    @Put(':id/update')
    async updateActivity(
        @Param('id', ParseObjectIdPipe) activityId: ObjectId,
        @Body() updateActivityDto: UpdateActivityDto
    ) {
        const update = await this.activityService.update(activityId, updateActivityDto)
        return update
    }

    @Get()
    async getActivity() {
        // console.log('hello')
        return this.activityService.findActivity()
    }

    @Post()
    async createActivity(@Body() createActivityDto: CreateActivityDto) {
        createActivityDto.userOwner = new ObjectId(createActivityDto.userOwner)
        return this.activityService.createActivity(createActivityDto);
    }
}

