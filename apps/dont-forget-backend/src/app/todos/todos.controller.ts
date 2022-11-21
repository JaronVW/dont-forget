import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Todo } from '../schemas/todo.schema';
import { TodosService } from './todos.service';


@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() todo: Todo) {
    return this.todosService.create(todo);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Todo) {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
