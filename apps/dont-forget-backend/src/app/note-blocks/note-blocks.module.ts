import { Module } from '@nestjs/common';
import { NoteBlocksService } from './note-blocks.service';
import { NoteBlocksController } from './note-blocks.controller';
import { NoteBlock, NoteBlockSchema } from '../schemas/noteBlock.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoteBlock.name, schema: NoteBlockSchema }]),
  ],
  controllers: [NoteBlocksController],
  providers: [NoteBlocksService]
})
export class NoteBlocksModule {}
