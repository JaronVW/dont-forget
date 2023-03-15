import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  create(userId: string,data: Todo) {
    data.dateCreated = new Date();
    data.userId = new mongoose.Types.ObjectId(userId);
    this.todoModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId: userId }).exec();
  }

  findOne(userId: string, id: string) {
    return this.todoModel.findOne({ id, userId }).exec();
  }

  async update(userId: string, id: string, data: Todo) {
    console.log(data);
    const res = await this.todoModel.findByIdAndUpdate(id, data, );
    if (res == null) throw new NotFoundException();
    else return { res };
  }

  remove(userId: string, id: string) {
    const res = this.todoModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Todo deleted' };
  }
}
