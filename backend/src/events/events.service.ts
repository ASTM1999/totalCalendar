import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';
// import { Workbook } from 'exceljs';
// import { buffer } from 'stream/consumers';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
// import { parse } from 'date-fns';
// import { off } from 'process';


interface ExcelRow {
    date: string;
    // startDate: string;
    // endDate: string;
    event: string;
    detail: string;
}


@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Events)
        private eventsRepository: Repository<Events>,
    ) { }

    async formatDateToYYYYMMDD(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            const formattedDate = new Date(`${year}-${month}-${day}`);
            return formattedDate.toISOString().split('T')[0];
        }
        return null;
    }

    async serialNumberToDate(serialNumber) {
        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(1357, 0, 9)

        const offset = (serialNumber - 1) * oneDay
        const targetDate = new Date(startDate.getTime() + offset)
        return targetDate
    }

    async get() {
        const data = await this.eventsRepository.find();
        const formattedDataPromises = data.map(async (file) => {
            const event = new Events();
            event.fieldname = file.fieldname;
            event.originalname = file.originalname;
            event.encoding = file.encoding;
            event.mimetype = file.mimetype;
            event.size = file.size;
            event.path = file.path

            const fileData = fs.readFileSync(file.path);
            const workbook = xlsx.read(fileData, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // console.log(worksheet)

            const Edata: ExcelRow[] = xlsx.utils.sheet_to_json(worksheet);
            // console.log(`Edata: ${Edata}`)

            const formattedData = await Promise.all(
                Edata.map(async (item) => ({
                    // startDate: (await this.formatDateToYYYYMMDD((await this.serialNumberToDate(item.startDate)).toLocaleDateString())),
                    // endDate: (await this.formatDateToYYYYMMDD((await this.serialNumberToDate(item.endDate)).toLocaleDateString())),
                    event: item.event,
                    detail: item.detail,
                    date: item.date
                    // date: (await this.formatDateToYYYYMMDD((await this.serialNumberToDate(item.date)).toLocaleDateString())),     
                })),
            );

            // console.log(`event : ${event.path}`)
            // console.log(formattedData);

            return formattedData;
        });

        const results = await Promise.all(formattedDataPromises);

        // นี่คือตัวอย่างการรวมข้อมูลทั้งหมดเข้าด้วยกันหลังจากที่ดึงข้อมูลจาก Excel เสร็จสิ้น
        const allFormattedData = [].concat(...results);

        return allFormattedData;
    }

    async createEvent(files: Express.Multer.File[], data: string) {
        try {
            // ทำการประมวลผลข้อมูลจากไฟล์ Excel ตามความต้องการ
            console.log(files)
            const savedEvents = await Promise.all(
                files.map(async (file) => {
                    const event = new Events();
                    event.fieldname = file.fieldname;
                    event.originalname = file.originalname;
                    event.encoding = file.encoding;
                    event.mimetype = file.mimetype;
                    event.size = file.size;
                    event.path = file.path
                    event.date = data



                    // อ่านข้อมูลจากไฟล์ Excel
                    // const fileData = fs.readFileSync(file.path);
                    // const workbook = xlsx.read(fileData, { type: 'buffer' });
                    // const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    // // อ่านข้อมูลจากไฟล์ Excel
                    // const data: ExcelRow[] = xlsx.utils.sheet_to_json(worksheet);

                    // console.log(data)
                    // const formattedData = await Promise.all(
                    //     data.map(async (item) => ({

                    //         date: (await this.formatDateToYYYYMMDD((await this.serialNumberToDate(item.date)).toLocaleDateString())),
                    //         event: item.event
                    //     }))
                    // )
                    // console.log(formattedData)
                    // ดึงข้อมูล Date และ event จากอ็อบเจ็กต์
                    // const datesAndEvents = data.map((row) => {
                    //     return {
                    //         date: row.date, // สมมติว่า "date" เป็นชื่อคอลัมน์ใน Excel
                    //         event: row.event, // สมมติว่า "eventName" เป็นชื่อคอลัมน์ใน Excel
                    //     };
                    // });

                    return await this.eventsRepository.save(event);
                }),
            );
            return savedEvents;
        } catch (error) {
            throw error;
        }
    }
}

