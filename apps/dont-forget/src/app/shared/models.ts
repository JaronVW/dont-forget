import {INote, IUser} from '@dont-forget/types';
import mongoose, { Schema } from 'mongoose';

export class Note implements INote {
  userId: Schema.Types.ObjectId;
  title: string;
  text: string;
  noteBlocks: [{ NoteBlockId: Schema.Types.ObjectId }];
}

export class User implements IUser {
  dateCreated: Date;
  email: string;
  password: string;
}

