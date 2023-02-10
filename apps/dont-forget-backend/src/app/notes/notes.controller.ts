import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '../schemas/note.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../decorators/user.decorator';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() note: Note) {
    return this.notesService.create(note);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    console.log(user.userId);
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() user: any) {
    console.log(user.userId);
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @AuthUser() user: any, @Body() data: Note) {
    console.log(user.userId);
    return this.notesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: any) {
    console.log(user.userId);
    return this.notesService.remove(id);
  }
}
