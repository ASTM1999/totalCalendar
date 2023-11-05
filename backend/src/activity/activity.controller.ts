import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ParseObjectIdPipe } from 'src/common/pipes';

import { UpdateActivityDto } from './dto/update-activity.dto';
import { ObjectId } from 'mongodb';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/update-comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('activity')
export class ActivityController {
    constructor(
        private activityService: ActivityService,
        public commentService: CommentService,
    ) { }

    @Get(':activityId/comment')
    async getComment() {
        return this.commentService.findComment()
    }
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
        console.log("comment Work")
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
        console.log(`activityUpdate ${updateActivityDto}`)
        const update = await this.activityService.update(activityId, updateActivityDto)
        return update
    }

    @Get()
    async getActivity(
        @Query('option') option: string
    ) {
        // console.log('hello')
        return this.activityService.findActivity(option)
    }

    @Post()
    async createActivity(@Body() createActivityDto: CreateActivityDto) {
        createActivityDto.userOwner = new ObjectId(createActivityDto.userOwner)
        return this.activityService.createActivity(createActivityDto);
    }
}
//     @Post()
//     @UseInterceptors(FileInterceptor('picture'))
//     async createActivity(@UploadedFile() picture, @Body() createActivityDto: CreateActivityDto) {
//         createActivityDto.userOwner = new ObjectId(createActivityDto.userOwner)
//         createActivityDto.picture = picture.filename;
//         return this.activityService.createActivity(createActivityDto);
//     }
// }

