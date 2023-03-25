import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(userId: string, data: Note) {
    data.dateCreated = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.userRef = new mongoose.Types.ObjectId(userId);
    const res = await this.noteModel.create(data);
    res.save()
  }

  async findAll(userId: string) {
    return await this.noteModel.find({ userRef: userId }).exec();
  }

  async findOne(id: string, userId: string) {
    return await this.noteModel.findById(id).exec();
  }

  async update(id: string, userId: string, data: Note) {
    const res = await this.noteModel.findById(id);
    if (res == null) throw new NotFoundException();
    if (String(res.userRef) !== userId) throw new UnauthorizedException();
    else {
      await this.noteModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { statusCode: 200, message: 'Note updated' };
    }
  }

  async remove(id: string, userId: string) {
    const res = await this.noteModel.findById(id);
    if (res == null) throw new NotFoundException();
    if (String(res.userRef) !== userId) throw new UnauthorizedException();
    else {
      await this.noteModel.findByIdAndDelete(id);
      return { statusCode: 200, message: 'Note deleted' };
    }
  }
}
