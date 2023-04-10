import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';
import { NoteDTO } from './NoteDTO';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(userId: string, data: NoteDTO) {
    try {
      data.dateCreated = new Date();

      data.userRef = userId;
      const res = await this.noteModel.create(data);
      res.save();
      return res;
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(userId: string) {
    return await this.noteModel.find({ userRef: userId }).exec();
  }

  async findOne(id: string, userId: string) {
    return await this.noteModel.findById(id).exec();
  }

  async update(id: string, userId: string, data: NoteDTO) {
    try {
      const res = await this.noteModel.findById(id).populate({
        path: 'userRef',
        select: '-password -email',
      });
      if (res == null) throw new NotFoundException();
      if (data == null) throw new BadRequestException();
      if (String(res.userRef._id) !== userId) throw new UnauthorizedException();
      const updatedNote = await this.noteModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return updatedNote;
    } catch (error) {
      console.log(error);
      if (error instanceof UnauthorizedException)
        throw new UnauthorizedException();
      throw new BadRequestException();
    }
  }

  async remove(id: string, userId: string) {
    const todo = await this.noteModel.findById(id).populate({
      path: 'userRef',
      select: '-password -email',
    });
    if (todo == null) throw new NotFoundException();
    if (String(todo.userRef._id) != userId) throw new UnauthorizedException();
    const deletedNote = await this.noteModel.findByIdAndDelete(id);
    return deletedNote;
  }
}
