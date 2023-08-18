import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class ActivityEntity {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    title: string;

    @Column()
    time: string;

    @ObjectIdColumn()
    userOwner: ObjectId;

    @Column()
    comment: string;

    @ObjectIdColumn()
    userComment: ObjectId;

    // @Column({nullable: true})
    // resetToken?: string;


}
export default ActivityEntity;