import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  create(data: Todo) {
    data.dateCreated = new Date();
    this.todoModel.create(data, function (err) {
      if (err) throw new BadRequestException();
    });
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, data: Todo) {
    const res = await this.todoModel.findByIdAndUpdate(id, data);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Todo updated' };
  }

  async remove(id: string) {
    const res = await this.todoModel.findByIdAndDelete(id);
    if (res == null) throw new NotFoundException();
    else return { statusCode: 200, message: 'Todo deleted' };
  }
}
