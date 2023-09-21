import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Camp {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    detail: string;

    @Column()
    time: string;

    @Column()
    userOwner: ObjectId;

    @Column()
    option: string;


}
export default Camp;