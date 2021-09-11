"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RoommateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoommateService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const roommate_schema_1 = require("./schemas/roommate.schema");
const counter_schema_1 = require("../Housing/schemas/counter.schema");
let RoommateService = RoommateService_1 = class RoommateService {
    constructor(roommateModel, counterModel) {
        this.roommateModel = roommateModel;
        this.counterModel = counterModel;
        this.logger = new common_1.Logger(RoommateService_1.name);
    }
    async create(params) {
        this.logger.log(`Create post: postId ${params.postId} authorId ${params.authorId}`);
        const createdRoommate = new this.roommateModel(params);
        return createdRoommate.save();
    }
    async findAll(page, limit) {
        this.logger.log(`Find all posts: page ${page} limit ${limit}`);
        return this.roommateModel.find()
            .sort({ createdTime: -1 })
            .skip(page * limit).limit(limit).exec();
    }
    async getPostById(postId) {
        this.logger.log(`Get specific post: postId ${postId}`);
        const post = await this.roommateModel.findOne({ postId });
        return post;
    }
    async searchPost(sdd) {
        const query = {};
        if (sdd.title)
            query.title = new RegExp(sdd.title, 'i');
        this.logger.log(`Search posts: query ${JSON.stringify(query)}`);
        const posts = await this.roommateModel.find(query);
        return posts;
    }
    async getCountAndIncrement() {
        const query = { name: `roommate` };
        const update = { $inc: { count: 1 } };
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        const roommateIdCounter = await this.counterModel.findOneAndUpdate(query, update, options).lean();
        return roommateIdCounter.count;
    }
};
RoommateService = RoommateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(roommate_schema_1.Roommate.name)),
    __param(1, (0, mongoose_2.InjectModel)(counter_schema_1.Counter.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], RoommateService);
exports.RoommateService = RoommateService;
//# sourceMappingURL=roommate.service.js.map