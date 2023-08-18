import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import Users from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }


    // async validateUser(username: string, pass: string): Promise<any> {
    //     console.log("username", username)
    //     const user = await this.userService.findOneAuth(username)
    //     console.log("auth.service pass: ", pass)
    //     console.log("auth.service user:", user)
    //     if (user && user?.password === pass) {
    //         const { password, ...result } = user;
    //         console.log("success validateUser")
    //         return result
    //     }
    //     const { password, ...result } = user
    //     console.log("result: if = null on auth.service:", result)
    //     return null;
    // }
    async validateUser(email: string): Promise<Users | null> {
        const user = await this.userService.findOneAuth(email);
        return user;
    }

    async generateAccessToken(user: Users): Promise<string> {
        const payload = { username: user.email, sub: user._id };
        return this.jwtService.sign(payload);
    }

    // แบบเดิม
    // async login(users: Users) {
    //     const payload = { username: users.email, sub: users._id }
    //     console.log("success loginUser")
    //     // console.log("payload on log in auth.service",payload)
    //     // console.log("accessToken:",this.jwtService.sign(payload))
    //     return {
    //         username: users.email,
    //         accessToken: this.jwtService.sign(payload),
    //         telephone: users.tel,
    //         _id : users._id,
    //         userstatus: users.status,
    //         name: users.username,
    //     }
    // }

    //แบบปกติ
    // async signIn(username: string, pass: string): Promise<any> {
    //     const user = await this.userService.findOne(username)
    //     if (user?.password !== pass) {
    //         throw new UnauthorizedException()
    //     }
    //     const { password, ...result } = user;
    //     console.log("password" + password)
    //     console.log("result" + result)
    //     console.log("user : " + user)

    //     return result
    // }
    async sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
        // Implement your email sending logic here
        // You can use any email service or library of your choice
        // Here's an example using the 'nodemailer' library

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);
    }
}
