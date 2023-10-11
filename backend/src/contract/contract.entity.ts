import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Contract {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    recomment: string;

    @Column()
    require_role: string;

    @Column()
    userOwner: ObjectId;
}
export default Contract;