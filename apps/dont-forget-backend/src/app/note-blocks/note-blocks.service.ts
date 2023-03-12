import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { NoteBlock, NoteBlockDocument } from '../schemas/noteBlock.schema';
import { Note, NoteDocument } from '../schemas/note.schema';

@Injectable()
export class NoteBlocksService {
  constructor(
    @InjectModel(NoteBlock.name)
    private noteBlockModel: Model<NoteBlockDocument>
  ) {}

  create(userId: string, data: NoteBlock) {
    data.dateCreated = new Date();
    data.userId = new mongoose.Schema.Types.ObjectId(userId);
    this.noteBlockModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  async findAll(userId: string) {
    return this.noteBlockModel.find({ userId: userId }).populate('notes'); // key to populate
  }

  async findShared(ids: string[]) {
    return this.noteBlockModel.find({ _id: { $in: ids } });
  }

  async findOne(id: string, userId: string) {
    const res = await this.noteBlockModel.findById(id).populate('notes');
    if (String(res.userId) !== userId)
      throw new BadRequestException();
    else return res;
  }

  async update(id: string, data: NoteBlock, userId: string) {
    const res = this.noteBlockModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'NoteBlock updated' };
  }

  async remove(id: string, userId: string) {
    const res = await this.noteBlockModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'NoteBlock deleted' };
  }
}
