import { ITodo } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';
import { User } from './user.schema';
import * as dayjs from 'dayjs';
import isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userRef: User;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, default: '', required: true })
  description: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: Date, default: Date.now })
  dateCreated: Date;

  @Prop({ type: Boolean })
  completed: boolean;

  @Prop({ type: [], default: [] })
  tasks: Task[];
}
const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.virtual('numberOfTasks').get(function (this: TodoDocument) {
  return this.tasks.length;
});

TodoSchema.virtual('dueThisWeek').get(function (this: TodoDocument) {
  return dayjs(this.dueDate).isBetween(dayjs(), dayjs().add(7, 'day'));
});

TodoSchema.virtual('overDue').get(function (this: TodoDocument) {
  return dayjs(this.dueDate).isBefore(dayjs());
});

export { TodoSchema };
