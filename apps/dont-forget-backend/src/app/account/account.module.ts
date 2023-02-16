import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteBlock, NoteBlockSchema } from '../schemas/noteBlock.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AccountModule {}
