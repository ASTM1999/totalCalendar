import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Contract {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    title: string;

    @Column()
    recommend: string;

    @Column()
    require_role: string;

    @Column()
    detail: string;

    @Column()
    time: string;
    
    @Column()
    userOwner: ObjectId;
}
export default Contract;