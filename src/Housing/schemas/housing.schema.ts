import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HousingDocument = Housing & Document;

class UserInfo {
  name: string;
  contact: string;
  message?: string;
}

class Comment {
  authorId: string; 
  content: string; 
  createdTime: Date;
}

@Schema()
export class Housing {
  @Prop()
  postId: number;
  @Prop()
  authorId: number;
  @Prop()
  author: string;
  @Prop()
  address: string;
  @Prop()
  name: string;
  @Prop()
  size: number;
  @Prop()
  startTime: Date;
  @Prop()
  endTime: Date;
  @Prop()
  price: string;
  @Prop()
  water: number;
  @Prop() 
  power: number;
  @Prop()
  net: number;
  @Prop()
  cooking: number;
  @Prop()
  laundry: number;
  @Prop()
  female: number;
  @Prop()
  pet: number;
  @Prop()
  desc: string;
  @Prop([String])
  images: string[];
  @Prop(UserInfo)
  userInfo: UserInfo;
  @Prop([Comment])
  comments: [Comment];
  @Prop()
  createdTime: Date;
  @Prop()
  active: number;
}

export const HousingSchema = SchemaFactory.createForClass(Housing);