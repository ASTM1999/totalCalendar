import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Activity from './activity.entity';
import { CommentModule } from 'src/comment/comment.module';
import Comments from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    // MulterModule.register({
    //   dest: "upload",
    // }),
    CommentModule,
    TypeOrmModule.forFeature([Activity, Comments]),
    // TypeOrmModule.forFeature([Activity, Camp, Announcement])
  ],
  controllers: [ActivityController],
  providers: [ActivityService, CommentService]
})
export class ActivityModule { }
