import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  create(userId: string, data: Todo) {
    data.dateCreated = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.userId = new mongoose.Types.ObjectId(userId);
    this.todoModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  async findAll(userId: string): Promise<Todo[]> {
    return await this.todoModel.find({ userId }).exec();
  }

  findOne(userId: string, id: string) {
    return this.todoModel.findById(id).exec();
  }

  async update(userId: string, id: string, data: Todo) {
    const res = await this.todoModel.findByIdAndUpdate(id, data);
    if (res == null) throw new NotFoundException();
    if (String(res.userId) != userId) throw new UnauthorizedException();
    else {
      await this.todoModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { statusCode: 200, message: 'Todo updated' };
    }
  }

  async remove(userId: string, id: string) {
    const res = await this.todoModel.findById(id);
    if (res == null) throw new NotFoundException();
    if (String(res.userId) != userId) throw new UnauthorizedException();
    else {
      await this.todoModel.findByIdAndDelete(id);
      return { statusCode: 200, message: 'Todo deleted' };
    }
  }
}
