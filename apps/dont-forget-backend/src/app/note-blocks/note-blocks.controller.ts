import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { NoteBlock } from '../schemas/noteBlock.schema';
import { NoteBlocksService } from './note-blocks.service';
import { AuthUser } from '../decorators/user.decorator';
import { Neo4jService } from '../neo4j/neo4j.service';
import {
  deleteShared,
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
  create(@AuthUser() user: any, @Body() noteBlock: NoteBlock) {
    return this.noteBlocksService.create(user.userId, noteBlock);
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
    const res = await this.neo4jService
      .write(shareNoteBlockWith, {
        nbIdParam: noteBlockId,
        idParam: userId,
      })
      .catch((err) => {
        console.log(err);
        if (err.message.includes('already exists')) {
          throw new BadRequestException();
        }
        throw new NotFoundException();
      })
      .then(() => {
        return { StatusCode: 200, message: 'NoteBlock shared' };
      });
    return res;
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

  @Delete('deleteshared/:id')
  removeShared(@AuthUser() user: any, @Param('id') id: string) {
    const res = this.neo4jService
      .write(deleteShared, {
        idParam: user.userId,
        nbIdParam: id,
      })
      .catch((err) => {
        console.log(err);
        throw new NotFoundException();
      })
      .then((res) => {
        console.log(res);
        return { StatusCode: 200, message: 'Shared noteblock deleted' };
      });
    return res;
  }

  @Get('numberofnotes/:id')
  getNumberOfNotes(@Param('id') id: string) {
    return this.noteBlocksService.numberOfNotes(id);
  }

}
