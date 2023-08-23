import { IsNotEmpty, IsString, IsNumber } from "class-validator"
import { ObjectId } from "mongodb"
// import { EmailExists } from "src/common/Validation"


export class CreateCommentDto {

    comment: string;

    userId: ObjectId;

    like: number;

    activityId: ObjectId;
}