import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ObjectId } from 'mongodb';

import Users from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from './mail.service';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any

@Injectable()
export class UsersService {
    findOne(userId: ObjectId) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private emailService: EmailService,

    ) { }

    async requestPasswordReset(email: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { email: email } });

        console.log("user: ", user)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const resetToken = Math.random().toString(20).substr(2, 12);
        // console.log("resetToken: ", resetToken)
        user.resetToken = resetToken;
        user.password = resetToken
        await this.userRepository.save(user);
        const Message = `${resetToken}`;
        // const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        console.log("resetUrl:", resetToken)
        await this.emailService.sendPasswordResetEmail(email, Message);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        console.log("get token:", token)
        const user = await this.userRepository.findOne({ where: { resetToken: token } });
        console.log("user after get token", user)

        if (!user) {
            throw new NotFoundException('Invalid reset token');
        }

        // Update the user's password and clear the reset token
        user.password = newPassword;
        user.resetToken = null;
        await this.userRepository.save(user);
    }

    async updateUser(id: ObjectId, updateUserDto: UpdateUserDto): Promise<Users> {
        try {
            const user = await this.userRepository.findOne({ where: { _id: new ObjectId(id) } })
            if(!user){
                return null //ถ้าไม่พยให้ return null
            }
            if(updateUserDto.role){
                user.role = updateUserDto.role
            }
            if(updateUserDto.username){
                user.username = updateUserDto.username
            }
            const updateUser = await this.userRepository.save(user)
            return updateUser
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error updating user');
        }
    }

    // // reset password
    // async updateUser(id: ObjectId, updateUserDto: CreateUserDto): Promise<User | null> {
    //     try {
    //         const user = await this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
    //         if (!user) {
    //             return null; // User not found
    //         }

    //         // Update the user entity with the values from the DTO
    //         Object.assign(user, updateUserDto);

    //         // Save the updated user entity
    //         const updatedUser = await this.userRepository.save(user);

    //         return updatedUser;
    //     } catch (error) {
    //         console.error(error);
    //         return null; // Handle any errors that occurred during the update process
    //     }
    // }


    async findOneAuth(email: string): Promise<Users | undefined> {
        console.log("findOneAuth:", email)
        return this.userRepository.findOne({ where: { email } })
    }

    async registerUser(createUserDto: CreateUserDto) {
        return this.userRepository.save(createUserDto)
    }

    async findById(item: ObjectId): Promise<Users> {
        console.log(item);
        const user = await this.userRepository.findOne({ where: { _id: item } });
        console.log("user:", user);
        return user;
    }

    async getUsers(): Promise<Users[]> {
        const users = await this.userRepository.find();
        console.log("user", users)
        return users;
    }


}
