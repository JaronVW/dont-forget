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
  create(@AuthUser() user: any, @Body() note: Note) {
    return this.notesService.create(user.userId,note);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    return this.notesService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@AuthUser() user: any, @Param('id') id: string) {
    return this.notesService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(@AuthUser() user: any, @Param('id') id: string, @Body() data: Note) {
    return this.notesService.update(user.userId, id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: any) {
    return this.notesService.remove(user.userId, id);
  }
}
