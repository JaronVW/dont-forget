import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  getUsersList(followingIds: string[]) {
    return this.userModel.find({ _id: { $in: followingIds } }, 'username');
  }

  async deleteAccount(userId: string) {
    await this.userModel.findOneAndDelete({ _id: userId });
  }
}
