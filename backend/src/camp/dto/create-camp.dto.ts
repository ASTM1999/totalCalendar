import { IsNotEmpty, IsInt, IsEmail, Validate } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateCampDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsNotEmpty()
    type: string
    
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    detail: string

    @IsNotEmpty()
    endDate: string
    
    @IsNotEmpty()
    startDate: string

    @IsNotEmpty()
    userOwner: ObjectId

    @IsNotEmpty()
    option: string
}