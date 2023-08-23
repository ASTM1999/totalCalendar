import { IsNotEmpty, IsInt, IsEmail, Validate, IsString } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateActivityDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    time: string

    @IsString()
    @IsNotEmpty()
    userOwner: ObjectId

    @IsNotEmpty()
    option: string
}