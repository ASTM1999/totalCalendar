import { IsNotEmpty, IsInt, IsEmail, Validate } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateUserDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    city: string

    @IsInt()
    role: number

    @IsInt()
    status: number

    @IsNotEmpty()
    tel: string

    @IsNotEmpty()
    idnumber: string

    teacherId: ObjectId
    
    resetToken?:string


}