import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { ObjectId } from 'mongodb';
// import Users from 'src/users/users.entity';
// import { JwtService } from '@nestjs/jwt/dist';
// import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private jwtService: JwtService
        // private jwtService: JwtService
    ) { }
    // @Post('login')
    // async login(@Request() req) {
    //     console.log("test")
    //     console.log("auth.controller req:",req)
    //     return this.authService.login(req.user)
    // }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginData: { username: string, password: string }): Promise<{
        name?: string;
        message: string;
        accessToken?: string;
        email?: string;
        role?: string;
        tel?: string;
        userId?:ObjectId;
    }> {
        const { username, password } = loginData;

        const user = await this.userService.findOneAuth(username);
        console.log(`user ${user}`)
        if (!user) {
            return { message: 'Email not found' };
        }

        if (user.password === password) {
            // const accessToken = await this.authService.generateAccessToken(user); // ให้ใช้ await ในการรับค่า accessToken
            const payload = { username: username, sub: user._id }
            return {
                message: 'Login success',
                // accessToken: accessToken,
                accessToken: this.jwtService.sign(payload),
                name: user.username,
                email: user.email,
                role: user.role,
                tel: user.tel,
                userId: user._id
            };
        } else {
            return {
                message: 'Inconrect email',
                name: user.username
            };
        }
    }


    //AuthGuard มาจาก PassPort ส่วน local มันลงทะเบียให้เราอัตโนมัติ
    // @UseGuards(LocalAuthGuard)
    // // @Post('login')
    // async login2(@Request() req) {
    //     // console.log("auth.controller req:",req)
    //     return this.authService.login(req.user)
    // }

}
