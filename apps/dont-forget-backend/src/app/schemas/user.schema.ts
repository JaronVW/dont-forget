import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';
import {IUser} from "@dont-forget/types";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser{
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  dateCreated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
