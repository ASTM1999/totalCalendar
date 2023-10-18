import { IsNotEmpty, IsInt, IsEmail, Validate } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateContractDto {
    // @Validate(EmailExists,{message:"message already"})
    _id?: ObjectId;

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    recommend: string

    @IsNotEmpty()
    require_role: string
    
    @IsNotEmpty()
    detail: string
    
    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    userOwner: ObjectId
}