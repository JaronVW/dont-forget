import { INote } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note implements INote {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userRef: User;

  @Prop({ type: String, required: true})
  title: string;

  @Prop({ type: String, required: true})
  text: string;

  @Prop({ type: Date, default: Date.now})
  dateCreated: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
