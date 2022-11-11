import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, ObjectId } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {

  @Prop()
  userId: ObjectId;

  @Prop()
  title: string;

  @Prop()
  text: number;

  @Prop()
  dateCreated: Date;

  @Prop()
  NoteBlocks: ObjectId[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
