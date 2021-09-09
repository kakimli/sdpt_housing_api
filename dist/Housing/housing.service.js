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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HousingService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const housing_schema_1 = require("./schemas/housing.schema");
const counter_schema_1 = require("./schemas/counter.schema");
let HousingService = class HousingService {
    constructor(housingModel, counterModel) {
        this.housingModel = housingModel;
        this.counterModel = counterModel;
    }
    async create(params) {
        const createdHousing = new this.housingModel(params);
        return createdHousing.save();
    }
    async findAll() {
        return this.housingModel.find().exec();
    }
    async getPostById(postId) {
        const post = await this.housingModel.findOne({ postId });
        return post;
    }
    async searchPost(shd) {
        const query = {};
        if (shd.address)
            query.address = new RegExp(shd.address, 'i');
        if (shd.name)
            query.name = new RegExp(shd.name, 'i');
        if (shd.size || shd.size === 0)
            query.size = shd.size;
        if (shd.startTime)
            query.startTime = { $gte: shd.startTime };
        if (shd.endTime)
            query.endTime = { $lte: shd.endTime };
        if (shd.price)
            query.price = shd.price;
        for (const utilName in shd.utilities) {
            if (shd.utilities[utilName] === 1)
                query[utilName] = 1;
        }
        for (const otherName in shd.other) {
            if (shd.other[otherName] === 1)
                query[otherName] = 1;
        }
        const posts = await this.housingModel.find(query);
        return posts;
    }
    async getCountAndIncrement() {
        const query = { name: `housing` };
        const update = { $inc: { count: 1 } };
        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        const housingIdCounter = await this.counterModel.findOneAndUpdate(query, update, options).lean();
        return housingIdCounter.count;
    }
    toTwoDigit(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    getDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        return `${year}-${this.toTwoDigit(month)}-${this.toTwoDigit(date)}`;
    }
};
HousingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(housing_schema_1.Housing.name)),
    __param(1, (0, mongoose_2.InjectModel)(counter_schema_1.Counter.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], HousingService);
exports.HousingService = HousingService;
//# sourceMappingURL=housing.service.js.map