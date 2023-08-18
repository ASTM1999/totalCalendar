import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Users {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    status: number;

    @Column()
    tel: string;

    @Column({nullable: true})
    resetToken?: string;


}
export default Users;