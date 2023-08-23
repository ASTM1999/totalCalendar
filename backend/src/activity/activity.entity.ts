import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Activity {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    title: string;

    @Column()
    time: string;

    @ObjectIdColumn()
    userOwner: ObjectId;

    @Column()
    option: string

}
export default Activity;