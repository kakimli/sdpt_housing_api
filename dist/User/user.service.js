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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const axios_1 = require("@nestjs/axios");
const config_1 = require("../config");
const counter_schema_1 = require("../Housing/schemas/counter.schema");
let UserService = UserService_1 = class UserService {
    constructor(userModel, counterModel, httpService) {
        this.userModel = userModel;
        this.counterModel = counterModel;
        this.httpService = httpService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async requestForOpenId(loginDto) {
        const api = `https://api.weixin.qq.com/sns/jscode2session`;
        const appid = `appid=${loginDto.appId}`;
        const secret = `secret=${config_1.default.APP_SECRET}`;
        const code = `js_code=${loginDto.code}`;
        const url = `${api}?${appid}&${secret}&${code}&grant_type=authorization_code`;
        return new Promise((resolve) => {
            this.httpService.get(url).subscribe((response) => {
                resolve(response);
            });
        });
    }
    async createUserIfNotExist(openId, username) {
        const user = await this.userModel.findOne({ openId });
        if (!user) {
            const query = { name: `user` };
            const update = { $inc: { count: 1 } };
            const options = {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            };
            const counter = await this.counterModel.findOneAndUpdate(query, update, options).lean();
            const userId = counter.count;
            const createdUser = new this.userModel({
                userId,
                openId,
                username,
                postCount: 0
            });
            createdUser.save();
            this.logger.log(`Create account: userId ${userId} openId ${openId}`);
            return userId;
        }
        return user.userId;
    }
    async findUser(userId) {
        const user = await this.userModel.findOne({ userId }).lean();
        return user;
    }
    async incrementPostCount(userId) {
        await this.userModel.findOneAndUpdate({ userId }, { $inc: { postCount: 1 } });
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(counter_schema_1.Counter.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        axios_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map