import { Document } from 'mongoose';
export declare type DemandDocument = Demand & Document;
declare class UserInfo {
    name: string;
    contact: string;
    message?: string;
}
export declare class Demand {
    postId: number;
    authorId: number;
    author: string;
    title: string;
    content: string;
    userInfo: UserInfo;
    createdTime: Date;
    active: number;
}
export declare const DemandSchema: import("mongoose").Schema<Document<Demand, any, any>, import("mongoose").Model<Document<Demand, any, any>, any, any>, {}>;
export {};
