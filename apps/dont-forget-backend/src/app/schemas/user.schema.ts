import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '@dont-forget/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  _id?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true, unique: true  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
