import { Document } from 'mongoose';
export declare type HousingDocument = Housing & Document;
declare class UserInfo {
    name: string;
    contact: string;
    message?: string;
}
declare class Comment {
    authorId: string;
    content: string;
    createdTime: Date;
}
export declare class Housing {
    postId: number;
    authorId: number;
    author: string;
    address: string;
    name: string;
    size: number;
    startTime: Date;
    endTime: Date;
    price: string;
    water: number;
    power: number;
    net: number;
    cooking: number;
    laundry: number;
    female: number;
    pet: number;
    desc: string;
    images: string[];
    userInfo: UserInfo;
    comments: [Comment];
    createdTime: Date;
    active: number;
}
export declare const HousingSchema: import("mongoose").Schema<Document<Housing, any, any>, import("mongoose").Model<Document<Housing, any, any>, any, any>, {}>;
export {};
