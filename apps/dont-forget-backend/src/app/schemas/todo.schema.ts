import { ITodo } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo  {
  _id?: any;

  @Prop()
  userId: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop()
  dateCreated: Date;

  @Prop()
  completed: boolean;

  @Prop()
  tasks: [{type: Task}];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
