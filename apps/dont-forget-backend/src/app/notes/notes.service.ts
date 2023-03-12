import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(userId: string,data: Note) {
    data.dateCreated = new Date();
    data.userId = new mongoose.Schema.Types.ObjectId(userId);
    this.noteModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll(userId: string) {
    return this.noteModel.find({userId}).exec();
  }

  findOne(id: string, userId: string) {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string,userId: string, data: Note) {
    const res = await this.noteModel.findByIdAndUpdate(id, data,{new: true});
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Note updated' };
  }

  async remove(id: string, userId: string,) {
    const res = await this.noteModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Note deleted' };
  }
}
