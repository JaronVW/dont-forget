import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { NoteBlock, NoteBlockDocument } from '../schemas/noteBlock.schema';
import { NoteBlockDTO } from './NoteBlockDTO';

@Injectable()
export class NoteBlocksService {
  constructor(
    @InjectModel(NoteBlock.name)
    private noteBlockModel: Model<NoteBlockDocument>
  ) {}

  async create(userId: string, data: NoteBlockDTO) {
    data.dateCreated = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.userRef = new mongoose.Types.ObjectId(userId);
    const res = await this.noteBlockModel.create(data);
    res.save();
    return res;
  }

  async findAll(userId: string) {
    return this.noteBlockModel.find({ userRef: userId }).populate('notes');
  }

  async findShared(ids: string[]) {
    return this.noteBlockModel.find({ _id: { $in: ids } });
  }

  async findOne(id: string, userId: string) {
    return await this.noteBlockModel.findById(id).populate('notes');
  }

  async update(id: string, data: NoteBlockDTO, userId: string) {
    const res = await this.noteBlockModel.findById(id).populate({
      path: 'userRef',
      select: '-password -email',
    });
    console.log(res);
    if (res == null) throw new NotFoundException();
    if (String(res.userRef._id) != userId) throw new UnauthorizedException();
    const updatedNoteBlock = await this.noteBlockModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    return updatedNoteBlock;
  }

  async remove(id: string, userId: string) {
    const res = await this.noteBlockModel.findById(id).populate({
      path: 'userRef',
      select: '-password -email',
    });
    if (res == null) throw new NotFoundException();
    if (String(res.userRef._id) != userId) throw new UnauthorizedException();
    const deletedNoteBlock = await this.noteBlockModel.findByIdAndDelete(id);
    return deletedNoteBlock;
  }
}
