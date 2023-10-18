import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Comments {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    comment: string;

    @Column()
    date: string;

    @Column()
    userId?: ObjectId;

    @Column()
    like?: number

    @Column()
    activityId?: ObjectId;


}
export default Comments;