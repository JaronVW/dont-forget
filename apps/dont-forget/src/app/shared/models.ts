import { INote, ITask, ITodo, IUser } from '@dont-forget/types';
import { Schema } from 'mongoose';

export class Note implements INote {
  _id?: any;
  title: string;
  text: string;
  dateCreated: Date;
}

export class User implements IUser {
  dateCreated: Date;
  email: string;
  password: string;
}

export class Todo implements ITodo {
  _id: any;
  title: string;
  description: string;
  dueDate: Date;
  dateCreated: Date;
  completed: boolean;
  tasks: Task[];
  numberOfTasks: number;
  dueThisWeek?: boolean;
  overDue?: boolean;
}

export class Task {
  title: string;
  completed: boolean;
  dateCreated: Date;
}

export class NoteBlock {
  _id?: any;
  userRef: any;
  title: string;
  description: string;
  dateCreated: Date;
  notes: Note[];
  numberOfNotes: number;
}

export class NoteBlockToSave {
  _id?: any;
  userRef: any;
  title: string;
  description: string;
  dateCreated: Date;
  notes: {
    _id: string;
  }[];
}
