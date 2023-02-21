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
  Put,
  BadRequestException,
} from '@nestjs/common';
import { NoteBlock } from '../schemas/noteBlock.schema';
import { NoteBlocksService } from './note-blocks.service';
import { AuthUser } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Neo4jService } from '../neo4j/neo4j.service';
import {
  getSharedNoteBlocks,
  shareNoteBlockWith,
} from '../neo4j/cypherQueries';

@Controller('noteblocks')
export class NoteBlocksController {
  constructor(
    private readonly noteBlocksService: NoteBlocksService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Post()
  create(@Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.create(noteBlock);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    return this.noteBlocksService.findAll(user.userId);
  }

  @Get('shared')
  async findShared(@AuthUser() user: any) {
    const data = await this.neo4jService.read(getSharedNoteBlocks, {
      idParam: user.userId,
    });
    const noteblockIds = data.records.map(
      (record) => record.get('c').properties.name
    );
    return this.noteBlocksService.findShared(noteblockIds);
  }

  @Put('sharenoteblock/:userId/:noteBlockId')
  async shareNoteBlock(
    @Param('userId') userId: string,
    @Param('noteBlockId') noteBlockId: string
  ) {
    this.neo4jService
      .write(shareNoteBlockWith, {
        nbIdParam: noteBlockId,
        idParam: userId,
      })
      .catch((err) => {
        console.log(err);
        return new BadRequestException()
      });
    return { StatusCode: 200, message: 'NoteBlock shared' };
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
