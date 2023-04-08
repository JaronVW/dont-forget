import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type NoteBlockDocument = HydratedDocument<NoteBlock>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class NoteBlock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userRef?: User;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true, default: '' })
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
