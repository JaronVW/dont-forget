import { ITask } from '@dont-forget/types';
import { Prop } from '@nestjs/mongoose';

export class Task implements ITask {

  @Prop()
  title: string;

  @Prop()
  completed: boolean;

  @Prop()
  dateCreated: Date;
}
