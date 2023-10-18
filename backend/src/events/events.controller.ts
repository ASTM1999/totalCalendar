import { Body, Controller, Get, Post, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
    async pullBuffer(
        @Query('option') option: string
    ) {
        console.log(option)
        return this.eventsService.get(option)
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
    async uploadFile(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() data: { option: string }
    ) {
        console.log('Received option:', data.option);
        console.log('Received files:', files);

        return this.eventsService.createEvent(files, data.option)
    }


}
