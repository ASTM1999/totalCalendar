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
    username: string; //userAdmin //user //Admin

    @Column()
    status: string;  //for require role  // active?

    @Column()
    option: string;  

    @Column()
    role: string;

    @Column()
    tel: string;

    @Column()
    byGoogle?: boolean;

    @Column({ nullable: true })
    resetToken?: string;

    sub?: string;


}
export default Users;