import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NoteBlock } from '../schemas/noteBlock.schema';
import { NoteBlocksService } from './note-blocks.service';
import { AuthUser } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('noteblocks')
export class NoteBlocksController {
  constructor(private readonly noteBlocksService: NoteBlocksService) {}

  @Post()
  create(@Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.create(noteBlock);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    return this.noteBlocksService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@AuthUser() user: any, @Param('id') id: string) {
    return this.noteBlocksService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @AuthUser() user: any,
    @Param('id') id: string,
    @Body() noteBlock: NoteBlock
  ) {
    return this.noteBlocksService.update(id, noteBlock, user.userId);
  }

  @Delete(':id')
  remove(@AuthUser() user: any, @Param('id') id: string) {
    return this.noteBlocksService.remove(id, user.userId);
  }
}
