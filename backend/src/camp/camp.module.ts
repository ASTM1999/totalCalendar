import { Module } from '@nestjs/common';
import { CampService } from './camp.service';
import { CampController } from './camp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Camp from './camp.entity';
import { CommentModule } from 'src/comment/comment.module';
import Comment from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Camp, Comment]),
    CommentModule
  ],
  providers: [CampService, CommentService],
  controllers: [CampController]
})
export class CampModule { }
