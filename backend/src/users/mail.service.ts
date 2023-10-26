import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: 'anusornSriprom1999@gmail.com',
                pass: 'gwlugowwbjcanrac',
            },
        });
    }

    async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
        const mailOptions = {
            from: 'anusornsriprom1999@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You have requested a password reset. Click the following link to reset your password: ${resetUrl}`,
        };

        // console.log("mailOptions",mailOptions)
        await this.transporter.sendMail(mailOptions);
    }
}
