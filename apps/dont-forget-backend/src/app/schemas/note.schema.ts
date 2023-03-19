import { INote } from '@dont-forget/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {  HydratedDocument, ObjectId } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note implements INote {
  @Prop()
  userId: ObjectId;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  dateCreated: Date;

  noteBlocks: [{ NoteBlockId: ObjectId }];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
