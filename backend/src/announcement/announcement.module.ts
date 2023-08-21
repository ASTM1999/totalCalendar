import { Module } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Announcement from './announcement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement])
  ],
  providers: [AnnouncementService],
  controllers: [AnnouncementController]
})
export class AnnouncementModule {}
