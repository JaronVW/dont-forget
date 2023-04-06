import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { TodoDTO } from './TodoDTO';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(userId: string, data: TodoDTO) {
    try {
      data.dateCreated = new Date();
      data.userRef = userId;
      const res = await this.todoModel.create(data);
      res.save();
      return res;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async findAll(userId: string): Promise<Todo[]> {
    return await this.todoModel.find({ userRef: userId }).exec();
  }

  async findOne(userId: string, id: string) {
    return await this.todoModel.findById(id).exec();
  }

  async update(userId: string, id: string, data: TodoDTO) {
    try {
      const todo = await this.todoModel.findById(id).populate({
        path: 'userRef',
        select: '-password -email',
      });
      if (todo == null) throw new NotFoundException();
      if (data == null) throw new BadRequestException();
      if (String(todo.userRef._id) != userId) throw new UnauthorizedException();
      const updatedTodo = await this.todoModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedTodo;
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(userId: string, id: string) {
    const todo = await this.todoModel.findById(id).populate({
      path: 'userRef',
      select: '-password -email',
    });
    if (todo == null) throw new NotFoundException();
    if (String(todo.userRef._id) != userId) throw new UnauthorizedException();
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);
    return deletedTodo;
  }
}
