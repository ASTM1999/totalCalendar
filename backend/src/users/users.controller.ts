import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { ParseObjectIdPipe } from 'src/common/pipes';

import Users from './users.entity';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    // reset password
    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string): Promise<void> {
        await this.usersService.requestPasswordReset(email);
    }

    @Post('reset-password')
    async resetPassword(
        @Body('token') token: string,
        @Body('newPassword') newPassword: string,
    ): Promise<void> {
        await this.usersService.resetPassword(token, newPassword);
    }
    // reset password


    @Get(':id')
    async findAllReviews(@Param('id', ParseObjectIdPipe) item: ObjectId): Promise<Users> {
        return this.usersService.findById(item)
    }

    @Get()
    async getUsers(): Promise<Users[]> {
        return this.usersService.getUsers();
    }


    @Put(':id/user-update')
    async updateUser(
        @Param('id', ParseObjectIdPipe) userId: ObjectId,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Users> {
        // console.log("userId", userId)
        // console.log("updateUserDto", updateUserDto)

        const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
        return updatedUser;
    }

    // @Put(':id')
    // async updateUser1(@Param('id', ParseObjectIdPipe) userId: ObjectId, @Body() updateUserDto: CreateUserDto): Promise<Users> {
    //     updateUserDto._id = new ObjectId(updateUserDto._id)
    //     updateUserDto.teacherId = new ObjectId(updateUserDto.teacherId);
    //     updateUserDto.status = 1
    //     const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    //     return updatedUser;
    // }



    @Post('register')
    async registerUser(
        @Body() createUserDto: CreateUserDto) {
        console.log("createUserDto: ", createUserDto)
        try {
            const user = await this.userRepository.findOne({ where: { email: createUserDto.email } });
            console.log("const user:", user);

            if (user && createUserDto.email === user.email) {
                return "Email already exists"
            } else {
                return this.usersService.registerUser(createUserDto);
            }
        } catch (error) {
            console.error(error);
            return false; // Handle any errors that occurred during the database query
        }
    }
}
