import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, ObjectId } from 'mongoose';
import { Task } from './task';

export type NoteBlockDocument = HydratedDocument<NoteBlock>;



@Schema()
export class NoteBlock {

  @Prop()
  userId: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: number;

  @Prop()
  dateCreated: Date;

  @Prop()
  notes: ObjectId[];

  @Prop()
  tasks: Task[];

}

export const NoteBlockSchema = SchemaFactory.createForClass(NoteBlock);
