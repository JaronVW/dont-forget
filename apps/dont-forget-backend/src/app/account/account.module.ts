import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Note, NoteSchema } from '../schemas/note.schema';
import { NoteBlock, NoteBlockSchema } from '../schemas/noteBlock.schema';
import { Todo, TodoSchema } from '../schemas/todo.schema';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AccountModule {}
