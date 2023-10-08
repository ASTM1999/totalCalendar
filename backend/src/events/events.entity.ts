import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Events {
  @ObjectIdColumn()
  id: ObjectId;
  
  @Column()
  fieldname: string;

  @Column()
  originalname: string;
  
  @Column()
  encoding: string;
  
  @Column()
  mimetype: string;
  
  @Column()
  size: number;

  @Column()
  date: string;
  
  @Column()
  eventName: string;

  @Column() 
  path: string;
  
  @Column() 
  option: string;

}
