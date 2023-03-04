import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name)
    private noteBlockModel: Model<UserDocument>
  ) {}

  getFollowing(followingIds: string[]) {
    return this.noteBlockModel.find({ _id: { $in: followingIds } }, 'username',);
  }
}
