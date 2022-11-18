import mongoose, { Schema } from 'mongoose';

export interface INote {
  _id?: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId,
  title: string,
  text: string,
  noteBlocks: [{
    NoteBlockId: Schema.Types.ObjectId
  }]
}

export interface IUser {
  email: string,
  password: string,
  dateCreated: Date
}


