import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Todo } from '../schemas/todo.schema';
import { TodosService } from './todos.service';
import { AuthUser } from '../decorators/user.decorator';
import { TodoDTO } from './TodoDTO';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@AuthUser() user: any, @Body() todo: TodoDTO) {
    return await this.todosService.create(user.userId, todo);
  }

  @Get()
  async findAll(@AuthUser() user: any) {
    return await this.todosService.findAll(user.userId);
  }

  @Get(':id')
  async findOne(@AuthUser() user: any, @Param('id') id: string) {
    return await this.todosService.findOne(user.userId, id);
  }

  @Put(':id')
  async update(
    @AuthUser() user: any,
    @Param('id') id: string,
    @Body() data: TodoDTO
  ) {
    return await this.todosService.update(user.userId, id, data);
  }

  @Delete(':id')
  async remove(@AuthUser() user: any, @Param('id') id: string) {
    return await this.todosService.remove(user.userId, id);
  }
}
