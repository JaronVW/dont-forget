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
  findAll(@AuthUser() user: any) {
    return this.todosService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@AuthUser() user: any, @Param('id') id: string) {
    return this.todosService.findOne(user.userId, id);
  }

  @Put(':id')
  update(
    @AuthUser() user: any,
    @Param('id') id: string,
    @Body() data: TodoDTO
  ) {
    console.log(data);
    return this.todosService.update(user.id, id, data);
  }

  @Delete(':id')
  remove(@AuthUser() user: any, @Param('id') id: string) {
    return this.todosService.remove(user.id, id);
  }
}
