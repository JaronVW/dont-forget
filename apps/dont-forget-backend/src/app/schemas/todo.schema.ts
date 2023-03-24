import { ITodo } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Todo {
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
  tasks: [Task];
  data: mongoose.Types.ObjectId;
}
const TodoSchema = SchemaFactory.createForClass(Todo);
TodoSchema.virtual('numberOfTasks').get(function (this: TodoDocument) {
  return this.tasks.length;
});

export { TodoSchema };
