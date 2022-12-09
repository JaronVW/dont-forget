import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Note } from './note.schema';

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
  notes: [{ type: mongoose.Types.ObjectId , ref: "notes" }];
}

export const NoteBlockSchema = SchemaFactory.createForClass(NoteBlock);
