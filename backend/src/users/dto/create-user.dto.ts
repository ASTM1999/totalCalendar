import { IsNotEmpty, IsInt, IsEmail, Validate } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateUserDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsEmail()
    // @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password?: string

    @IsNotEmpty()
    username: string
    
    //กำหรดให่เมื่อเริ่มสมัครเป็น user // เมื่อได้รับการแก้ไขบทบาทให้เป็น userAdmin
    @IsNotEmpty()
    status?: string

    @IsNotEmpty()
    option?: string
    
    @IsNotEmpty() //user //userAdmin
    role?: string
    
    @IsInt()
    tel: string
    
    byGoogle?: boolean
    sub?:string
    resetToken?:string


}