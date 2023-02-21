import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { userSignUpDto } from '../auth/UserSignUpDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ $or: [{ username }, { email: username }] });
  }

  createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
