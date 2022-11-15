import { INote } from '@dont-forget/types';
import { Schema } from 'mongoose';

export class Note implements INote {
  userId: Schema.Types.ObjectId;
  title: string;
  text: string;
  noteBlocks: [{ NoteBlockId: Schema.Types.ObjectId }];
}
