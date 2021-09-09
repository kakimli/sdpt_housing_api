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
exports.HousingController = void 0;
const common_1 = require("@nestjs/common");
const create_housing_dto_1 = require("./dto/create-housing.dto");
const housing_service_1 = require("./housing.service");
const common_2 = require("@nestjs/common");
const search_housing_dto_1 = require("./dto/search-housing.dto");
const user_service_1 = require("../User/user.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
let HousingController = class HousingController {
    constructor(housingService, userService) {
        this.housingService = housingService;
        this.userService = userService;
    }
    async getAllPosts() {
        const allPosts = await this.housingService.findAll();
        return allPosts;
    }
    async searchPosts(searchHousingDto) {
        console.log('searchHousingDto:', searchHousingDto);
        const posts = await this.housingService.searchPost(searchHousingDto);
        return posts;
    }
    async uploadFile(file) {
        console.log('/upload');
        console.log(file);
        try {
            const dateString = this.housingService.getDateString();
            const filename = `${dateString}-${file.originalname}`;
            const writeImage = (0, fs_1.createWriteStream)((0, path_1.join)(__dirname, '..', '../public/upload', `${filename}`));
            await writeImage.write(file.buffer);
            console.log('dest', (0, path_1.join)(__dirname, '..', '../public/upload', `${filename}`));
            return { success: true, data: filename };
        }
        catch (e) {
            return { success: false, msg: e.toString() };
        }
    }
    async getPostById(id) {
        const post = await this.housingService.getPostById(id);
        if (!post)
            return { success: false, msg: 'post not exist' };
        return { success: true, data: post };
    }
    async createPost(createHousingDto, session) {
        console.log('createHousingDto:', createHousingDto);
        if (!session.userId)
            return { success: false, msg: 'no_user_id' };
        const user = await this.userService.findUser(session.userId);
        if (!user)
            return { success: false, msg: 'user_not_exist' };
        const authorId = user.userId;
        const author = user.username;
        const postId = await this.housingService.getCountAndIncrement();
        const otherParams = {
            postId,
            authorId,
            author,
            comments: [],
            active: 1,
            userInfo: {
                name: createHousingDto.contactName,
                contact: createHousingDto.contact,
                message: createHousingDto.message
            },
            createdTime: new Date()
        };
        const params = Object.assign({}, createHousingDto, otherParams, createHousingDto.utilities, createHousingDto.other);
        const post = await this.housingService.create(params);
        return { success: true, data: post };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HousingController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_housing_dto_1.SearchHousingDto]),
    __metadata("design:returntype", Promise)
], HousingController.prototype, "searchPosts", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HousingController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HousingController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_housing_dto_1.CreateHousingDto, Object]),
    __metadata("design:returntype", Promise)
], HousingController.prototype, "createPost", null);
HousingController = __decorate([
    (0, common_1.Controller)('housing'),
    __metadata("design:paramtypes", [housing_service_1.HousingService,
        user_service_1.UserService])
], HousingController);
exports.HousingController = HousingController;
//# sourceMappingURL=housing.controller.js.map