import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Transform(({ obj }) => obj._id.toString())
  _id: mongoose.Types.ObjectId;

  @Exclude()
  __v: number;

  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Prop({ required: true, unique: true })
  username: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Exclude()
  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
