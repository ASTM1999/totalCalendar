import { IsNotEmpty, IsString, IsNumber } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateCommentDto {
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    userId: ObjectId;

    like?: number;
    
    @IsNotEmpty()
    activityId: ObjectId;

    @IsNotEmpty()
    date: string;
}