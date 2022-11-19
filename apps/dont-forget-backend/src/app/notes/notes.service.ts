import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}
  
  create(data: Note) {
    this.noteModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findOne(id: number) {
    return this.noteModel.findById(id).exec();
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  async remove(id: string) {
    const res = await this.noteModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Note deleted' };
  }
}
