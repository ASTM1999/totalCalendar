import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { CalendarModule } from './calendar/calendar.module';
import { CampModule } from './camp/camp.module';
import Activity from './activity/activity.entity';
import Announcement from './announcement/announcement.entity';
import Camp from './camp/camp.entity';
import { AnnouncementModule } from './announcement/announcement.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://0.0.0.0:27017/',
      database: "totalCalendar",
      synchronize: true,
      logging: true,
      entities: [
        Users,
        Activity,
        Announcement,
        Camp,
      ],
    }),
    UsersModule,
    AuthModule,
    ActivityModule,
    CalendarModule,
    AnnouncementModule,
    CampModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

