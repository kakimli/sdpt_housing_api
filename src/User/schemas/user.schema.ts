import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: number;
  @Prop()
  openId: string;
  @Prop()
  username: string;
  @Prop()
  postCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);