import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteBlock, NoteBlockDocument } from '../schemas/noteBlock.schema';

@Injectable()
export class NoteBlocksService {
  constructor(
    @InjectModel(NoteBlock.name)
    private noteBlockModel: Model<NoteBlockDocument>
  ) {}

  create(data: NoteBlock) {
    data.dateCreated = new Date();
    this.noteBlockModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll() {
    return this.noteBlockModel.find().populate('notes').exec();
  }

  findOne(id: string) {
    return this.noteBlockModel.findById(id).populate('notes').exec();
  }

  async update(id: string, data: NoteBlock) {
    const res = await this.noteBlockModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'NoteBlock updated' };
  }

  async remove(id: string) {
    const res = await this.noteBlockModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'NoteBlock deleted' };
  }
}
