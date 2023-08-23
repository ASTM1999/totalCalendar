import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Camp {
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
    // @Column({nullable: true})
    // resetToken?: string;


}
export default Camp;