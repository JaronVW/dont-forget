import { INote, IUser } from '@dont-forget/types';
import mongoose, { Schema } from 'mongoose';

export class Note implements INote {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
  text: string;
  noteBlocks: [{ NoteBlockId: Schema.Types.ObjectId }];
  dateCreated: Date;
}

export class User implements IUser {
  dateCreated: Date;
  email: string;
  password: string;
}
