import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '@dont-forget/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  _id?: string;

  @Prop({ required: true, unique: true, match: /^\S+@\S+\.\S+$/ })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true, default: new Date() })
  dateCreated: Date;

  @Prop({ required: true, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.post('findOneAndDelete', async (doc: UserDocument) => {
  await doc.$model('Note').deleteMany({ userRef: doc._id });
  await doc.$model('NoteBlock').deleteMany({ userRef: doc._id });
  await doc.$model('Todo').deleteMany({ userRef: doc._id });
});
