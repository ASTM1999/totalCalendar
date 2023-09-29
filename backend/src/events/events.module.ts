import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './events.entity';


//testmulter
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    MulterModule.register({
      dest: "upload",
    }),
    TypeOrmModule.forFeature([Events])
  ],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule { }
