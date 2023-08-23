import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Announcement from './announcement.entity';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';
import Comment from 'src/comment/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement,Comment]),
    CommentModule
  ],
  providers: [AnnouncementService,CommentService],
  controllers: [AnnouncementController]
})
export class AnnouncementModule {}
