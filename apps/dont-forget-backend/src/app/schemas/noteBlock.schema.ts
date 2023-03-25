import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Note } from './note.schema';

export type NoteBlockDocument = HydratedDocument<NoteBlock>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class NoteBlock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userRef?: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: number;

  @Prop({ type: Date, default: Date.now })
  dateCreated: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }])
  notes: mongoose.Types.ObjectId[];
}
const NoteBlockSchema = SchemaFactory.createForClass(NoteBlock);

NoteBlockSchema.virtual('numberOfNotes').get(function (
  this: NoteBlockDocument
) {
  return this.notes.length;
});

export { NoteBlockSchema };
