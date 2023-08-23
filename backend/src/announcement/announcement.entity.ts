import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Announcement {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    title: string;

    @Column()
    time: string;

    @Column()
    userOwner: ObjectId;

    @Column()
    option: string;


}
export default Announcement;