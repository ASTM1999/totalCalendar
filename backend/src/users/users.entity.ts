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
    role: string;

    @Column()
    tel: number;

    @Column({nullable: true})
    resetToken?: string;


}
export default Users;