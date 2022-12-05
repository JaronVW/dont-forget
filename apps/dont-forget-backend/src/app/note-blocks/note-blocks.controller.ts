import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteBlock } from '../schemas/noteBlock.schema';
import { NoteBlocksService } from './note-blocks.service';


@Controller('noteblocks')
export class NoteBlocksController {
  constructor(private readonly noteBlocksService: NoteBlocksService) {}

  @Post()
  create(@Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.create(noteBlock);
  }

  @Get()
  findAll() {
    return this.noteBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteBlocksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.update(id, noteBlock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteBlocksService.remove(id);
  }
}
