import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoommateDocument = Roommate & Document;

class UserInfo {
  name: string;
  contact: string;
  message?: string;
}

@Schema()
export class Roommate {
  @Prop()
  postId: number;
  @Prop()
  authorId: number;
  @Prop()
  author: string;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop(UserInfo)
  userInfo: UserInfo;
  @Prop()
  createdTime: Date;
  @Prop()
  active: number;
}

export const RoommateSchema = SchemaFactory.createForClass(Roommate);