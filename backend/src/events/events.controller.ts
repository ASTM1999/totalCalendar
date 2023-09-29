import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { EventsService } from './events.service';
// import mime from 'mime';
// import * as fs from 'fs';
// import * as xlsx from 'xlsx';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) { }

    @Get('pullbuffer')
    async pullBuffer() {
        return this.eventsService.get()
    }

    // ตัวทดสอบ
    // @Post('upload')
    // @UseInterceptors(FilesInterceptor('file'))
    // async handleUpload(@UploadedFiles() file: Express.Multer.File) {
    //     console.log('file', file)
    //     return 'file upload'
    // }


    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        // console.log(files);
        // const option = "suranaree"
        return this.eventsService.createEvent(files)
    }


}
