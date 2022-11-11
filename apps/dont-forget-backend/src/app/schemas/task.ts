import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export class Task {
  @Prop()
  userId: ObjectId;

  @Prop()
  title: string;

  @Prop()
  completed: boolean;

  @Prop()
  dateCreated: Date;
}
