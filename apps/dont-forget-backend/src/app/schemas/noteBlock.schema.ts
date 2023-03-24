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
  @Prop()
  userId?: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: number;

  @Prop()
  dateCreated: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }])
  notes: mongoose.Types.ObjectId[];
}
const NoteBlockSchema = SchemaFactory.createForClass(NoteBlock);

NoteBlockSchema.virtual('numberOfNotes').get(function (this: NoteBlockDocument) {
  return this.notes.length;
});

export { NoteBlockSchema };
