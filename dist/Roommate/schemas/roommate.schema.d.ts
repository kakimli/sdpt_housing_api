import { Document } from 'mongoose';
export declare type RoommateDocument = Roommate & Document;
declare class UserInfo {
    name: string;
    contact: string;
    message?: string;
}
export declare class Roommate {
    postId: number;
    authorId: number;
    author: string;
    title: string;
    content: string;
    userInfo: UserInfo;
    createdTime: Date;
    active: number;
}
export declare const RoommateSchema: import("mongoose").Schema<Document<Roommate, any, any>, import("mongoose").Model<Document<Roommate, any, any>, any, any>, {}>;
export {};
