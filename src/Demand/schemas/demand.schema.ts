import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DemandDocument = Demand & Document;

class UserInfo {
  name: string;
  contact: string;
  message?: string;
}

@Schema()
export class Demand {
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

export const DemandSchema = SchemaFactory.createForClass(Demand);