import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Comment {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    comment: string;

    @Column()
    userId?: ObjectId;

    @Column()
    like: number

    @Column()
    activityId?: ObjectId;

}
export default Comment;