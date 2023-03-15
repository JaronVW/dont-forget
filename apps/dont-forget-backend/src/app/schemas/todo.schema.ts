import { ITodo } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo  {
  _id?: any;

  @Prop()
  userId: mongoose.Types.ObjectId;

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
  tasks: [Task];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
