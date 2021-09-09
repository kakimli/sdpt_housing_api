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
exports.DemandController = void 0;
const common_1 = require("@nestjs/common");
const create_demand_dto_1 = require("./dto/create-demand.dto");
const demand_service_1 = require("./demand.service");
const common_2 = require("@nestjs/common");
const search_demand_dto_1 = require("./dto/search-demand.dto");
const user_service_1 = require("../User/user.service");
let DemandController = class DemandController {
    constructor(demandService, userService) {
        this.demandService = demandService;
        this.userService = userService;
    }
    async getAllPosts() {
        const allPosts = await this.demandService.findAll();
        return allPosts;
    }
    async searchPosts(searchDemandDto) {
        const posts = await this.demandService.searchPost(searchDemandDto);
        return posts;
    }
    async getPostById(id) {
        const post = await this.demandService.getPostById(id);
        if (!post)
            return { success: false, msg: 'post_not_exist' };
        return { success: true, data: post };
    }
    async createPost(createDemandDto, session) {
        if (!session.userId)
            return { success: false, msg: 'no_user_id' };
        const user = await this.userService.findUser(session.userId);
        if (!user)
            return { success: false, msg: 'user_not_exist' };
        const authorId = user.userId;
        const author = user.username;
        const postId = await this.demandService.getCountAndIncrement();
        const otherParams = {
            postId,
            authorId,
            author,
            active: 1,
            userInfo: {
                name: createDemandDto.contactName,
                contact: createDemandDto.contact,
                message: createDemandDto.message
            },
            createdTime: new Date()
        };
        const params = Object.assign({}, createDemandDto, otherParams);
        const post = await this.demandService.create(params);
        return { success: true, data: post };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('/search'),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_demand_dto_1.SearchDemandDto]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "searchPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_2.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demand_dto_1.CreateDemandDto, Object]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "createPost", null);
DemandController = __decorate([
    (0, common_1.Controller)('demand'),
    __metadata("design:paramtypes", [demand_service_1.DemandService,
        user_service_1.UserService])
], DemandController);
exports.DemandController = DemandController;
//# sourceMappingURL=demand.controller.js.map