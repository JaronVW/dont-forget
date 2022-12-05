import { INote, ITask, ITodo, IUser } from '@dont-forget/types';
import { Schema } from 'mongoose';

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

export class Todo implements ITodo {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  dateCreated: Date;
  completed: boolean;
  tasks: ITask[];
}

export class Task implements ITask {
  title: string;
  completed: boolean;
  dateCreated: Date;
}

export class NoteBlock {
  _id?: any
  userId: any;
  title: string;
  description: number;
  dateCreated: Date;
  notes: [{ noteId: any }];
}
