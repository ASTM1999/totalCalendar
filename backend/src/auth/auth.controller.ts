import { Controller, Post, Get, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
// import { JwtService } from '@nestjs/jwt/dist';
// import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        // private jwtService: JwtService
    ) { }


    @Post('login')
    async login(@Body() loginData: { username: string, password: string }): Promise<{ message: string; accessToken?: string }> {
        const { username, password } = loginData;
        console.log(`Username: ${username}`);
        const user = await this.userService.findOneAuth(username);
        console.log(`user: ${user}`);

        if (!user) {
            return { message: 'Email not found' };
        }

        if (user.password === password) {
            const accessToken = await this.authService.generateAccessToken(user); // ให้ใช้ await ในการรับค่า accessToken
            return {
                message: 'Login success',
                accessToken: accessToken,
            };
        } else {
            return { message: 'Incorrect email' };
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
