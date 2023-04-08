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
  ConflictException,
} from '@nestjs/common';
import { NoteBlocksService } from './note-blocks.service';
import { AuthUser } from '../decorators/user.decorator';
import { Neo4jService } from '../neo4j/neo4j.service';
import {
  createNoteBlockNode,
  deleteNoteBlockNode,
  deleteShared,
  getSharedNoteBlocks,
  shareNoteBlockWith,
} from '../neo4j/cypherQueries';
import { NoteBlockDTO } from './NoteBlockDTO';

@Controller('noteblocks')
export class NoteBlocksController {
  constructor(
    private readonly noteBlocksService: NoteBlocksService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Post()
  create(@AuthUser() user: any, @Body() noteBlock: NoteBlockDTO) {
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

  // @Put('sharenoteblock/:userId/:noteBlockId')
  // async shareNoteBlock(
  //   @Param('userId') userId: string,
  //   @Param('noteBlockId') noteBlockId: string
  // ) {
  //   const res = await this.neo4jService
  //     .write(shareNoteBlockWith, {
  //       nbIdParam: noteBlockId,
  //       idParam: userId,
  //     })
  //     .catch((err) => {
  //
  //       if (err.message.includes('already exists')) {
  //         throw new BadRequestException();
  //       }
  //       throw new NotFoundException();
  //     })
  //     .then(() => {

  //       return { StatusCode: 200, message: 'NoteBlock shared' };
  //     });
  //   return res;
  // }

  @Put('sharenoteblock/:userId/:noteBlockId')
  async shareNoteBlock(
    @Param('userId') userId: string,
    @Param('noteBlockId') noteBlockId: string
  ): Promise<{
    StatusCode: number;
    message?: string;
  }> {
    try {
      await this.neo4jService.write(createNoteBlockNode, {
        nbIdParam: noteBlockId,
      });
      await this.neo4jService.write(shareNoteBlockWith, {
        idParam: userId,
        nbIdParam: noteBlockId,
      });
    } catch (err) {
      if (err.message.includes('already exists')) {
        throw new ConflictException();
      }
      throw new NotFoundException();
    }

    return Promise.resolve({
      StatusCode: 200,
      message: 'NoteBlock shared',
    });
  }

  @Get(':id')
  findOne(@AuthUser() user: any, @Param('id') id: string) {
    return this.noteBlocksService.findOne(id, user.userId);
  }

  @Put(':id')
  update(
    @AuthUser() user: any,
    @Param('id') id: string,
    @Body() noteBlock: NoteBlockDTO
  ) {
    return this.noteBlocksService.update(id, noteBlock, user.userId);
  }

  @Delete(':id')
  async remove(@AuthUser() user: any, @Param('id') id: string) {
    const res = await this.noteBlocksService.remove(id, user.userId);
    this.neo4jService.write(deleteNoteBlockNode, {
      nbIdParam: id,
    });
    return res;
  }

  @Delete('deleteshared/:id')
  removeShared(@AuthUser() user: any, @Param('id') id: string) {
    try {
      this.neo4jService.write(deleteShared, {
        idParam: user.userId,
        nbIdParam: id,
      });
      return { StatusCode: 200, message: 'Shared noteblock deleted' };
    } catch {
      throw new NotFoundException();
    }
  }
}
