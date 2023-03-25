import { ITodo } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';
import { User } from './user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Todo {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    validators: [mongoose.Types.ObjectId.isValid, 'Invalid ObjectId'],
  })
  id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  userRef: User;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: Date })
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

export { TodoSchema };
