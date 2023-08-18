import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import Users from './users.entity';
import { EmailService } from './mail.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Users])],
    
  controllers: [UsersController],
  providers: [UsersService, EmailService],
  exports: [UsersService, EmailService ]
})
export class UsersModule { }
  