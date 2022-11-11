import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  dateCreated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
