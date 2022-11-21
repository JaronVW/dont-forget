import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(data: Note) {
    data.dateCreated = new Date();
    this.noteModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll() {
    return this.noteModel.find().exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, data: Note) {
    const res = await this.noteModel.findByIdAndUpdate(id, data);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Note updated' };
  }

  async remove(id: string) {
    const res = await this.noteModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Note deleted' };
  }
}
