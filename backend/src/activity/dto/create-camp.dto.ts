import { IsNotEmpty, IsInt, IsEmail, Validate } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateCampDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    userOwner: ObjectId

    comment: string

    userComment: ObjectId


}