import {  } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export interface INote {
  userId: Schema.Types.ObjectId,
  title: string,
  text: string,
  noteBlocks: [{
    NoteBlockId: Schema.Types.ObjectId
  }]
}