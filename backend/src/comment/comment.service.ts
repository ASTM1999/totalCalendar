import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from './comment.entity';
import { ObjectId } from 'mongodb';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) { }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.commentRepository.delete(id)
            return result.affected > 0;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async findComment(): Promise<Comment[]> {
        const comment = await this.commentRepository.find()
        return comment
    }
    async updateComment(id: ObjectId, updateCommentDto: UpdateCommentDto) {
        try {
            const comment = await this.commentRepository.findOne({ where: { _id: new ObjectId(id) } })
            console.log(comment)
            if (!comment) {
                return null
            }
            if (updateCommentDto.comment) {
                comment.comment = updateCommentDto.comment
            }
            if (updateCommentDto.like) {
                comment.like = updateCommentDto.like
            }
            const update = await this.commentRepository.save(comment)
            console.log("update success")
            return update
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error update comment in announcement')
        }
    }


    async createComment(activityId: ObjectId, data: CreateCommentDto) {
        data.activityId = activityId
        return this.commentRepository.save(data)
    }

}
