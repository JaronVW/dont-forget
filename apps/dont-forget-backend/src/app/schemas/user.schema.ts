import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '@dont-forget/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  _id?: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  dateCreated: Date;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
