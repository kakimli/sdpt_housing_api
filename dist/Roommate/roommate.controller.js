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
var RoommateController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoommateController = void 0;
const common_1 = require("@nestjs/common");
const create_roommate_dto_1 = require("./dto/create-roommate.dto");
const roommate_service_1 = require("./roommate.service");
const common_2 = require("@nestjs/common");
const search_roommate_dto_1 = require("./dto/search-roommate.dto");
const user_service_1 = require("../User/user.service");
const config_1 = require("../config");
let RoommateController = RoommateController_1 = class RoommateController {
    constructor(roommateService, userService) {
        this.roommateService = roommateService;
        this.userService = userService;
        this.logger = new common_1.Logger(RoommateController_1.name);
    }
    async getAllPosts(page, limit) {
        page = page || 0;
        limit = limit || 50;
        const allPosts = await this.roommateService.findAll(page, limit);
        return allPosts;
    }
    async searchPosts(searchRoommateDto) {
        const posts = await this.roommateService.searchPost(searchRoommateDto);
        return posts;
    }
    async getPostById(id) {
        const post = await this.roommateService.getPostById(id);
        if (!post)
            return { success: false, msg: 'post_not_exist' };
        return { success: true, data: post };
    }
    async createPost(createRoommateDto, session) {
        if (!session.userId)
            return { success: false, msg: 'no_user_id' };
        const user = await this.userService.findUser(session.userId);
        if (!user)
            return { success: false, msg: 'user_not_exist' };
        if (user.postCount >= config_1.default.maxPostCount) {
            this.logger.log(`Create exceed max post count: userId ${user.userId}`);
            return { success: false, msg: 'exceed_max_post_count' };
        }
        const authorId = user.userId;
        const author = user.username;
        const postId = await this.roommateService.getCountAndIncrement();
        const otherParams = {
            postId,
            authorId,
            author,
            active: 1,
            userInfo: {
                name: createRoommateDto.contactName,
                contact: createRoommateDto.contact,
                message: createRoommateDto.message
            },
            createdTime: new Date()
        };
        const params = Object.assign({}, createRoommateDto, otherParams);
        const post = await this.roommateService.create(params);
        await this.userService.incrementPostCount(authorId);
        return { success: true, data: post };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RoommateController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_roommate_dto_1.SearchRoommateDto]),
    __metadata("design:returntype", Promise)
], RoommateController.prototype, "searchPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoommateController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_roommate_dto_1.CreateRoommateDto, Object]),
    __metadata("design:returntype", Promise)
], RoommateController.prototype, "createPost", null);
RoommateController = RoommateController_1 = __decorate([
    (0, common_1.Controller)('roommate'),
    __metadata("design:paramtypes", [roommate_service_1.RoommateService,
        user_service_1.UserService])
], RoommateController);
exports.RoommateController = RoommateController;
//# sourceMappingURL=roommate.controller.js.map