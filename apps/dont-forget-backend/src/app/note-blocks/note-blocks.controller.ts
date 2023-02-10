import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { NoteBlock } from '../schemas/noteBlock.schema';
import { NoteBlocksService } from './note-blocks.service';
import { AuthUser } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('noteblocks')
export class NoteBlocksController {
  constructor(private readonly noteBlocksService: NoteBlocksService) {}

  @Post()
  create(@Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.create(noteBlock);
  }

  @Get()
  findAll(@AuthUser() user:any) {
    console.log(user);
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
