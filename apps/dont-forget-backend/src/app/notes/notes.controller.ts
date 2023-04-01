import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../decorators/user.decorator';
import { NoteDTO } from './NoteDTO';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@AuthUser() user: any, @Body() note: NoteDTO) {
    return await this.notesService.create(user.userId, note);
  }

  @Get()
  async findAll(@AuthUser() user: any) {
    return await this.notesService.findAll(user.userId);
  }

  @Get(':id')
  async findOne(@AuthUser() user: any, @Param('id') id: string) {
    return await this.notesService.findOne(id, user.userId);
  }

  @Put(':id')
  async update(
    @AuthUser() user: any,
    @Param('id') id: string,
    @Body() data: NoteDTO
  ) {
    return await this.notesService.update(id, user.userId, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() user: any) {
    return await this.notesService.remove(id, user.userId);
  }
}
