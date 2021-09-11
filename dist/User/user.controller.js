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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const user_service_1 = require("./user.service");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async login(loginDto, session) {
        try {
            const res = await this.userService.requestForOpenId(loginDto);
            const openId = res.data.openid;
            if (!openId)
                return { success: false, msg: 'wx_request_failed' };
            const username = loginDto.username;
            const userId = await this.userService.createUserIfNotExist(openId, username);
            session.userId = userId;
            this.logger.log(`Login: userId ${userId}`);
            return userId;
        }
        catch (e) {
            return { success: false, msg: e.toString() };
        }
    }
    async checkLoginState(session) {
        try {
            const userId = session.userId;
            if (!userId)
                return { success: false, msg: 'no_userId' };
            const user = this.userService.findUser(userId);
            if (!user)
                return { success: false, msg: 'user_not_exist' };
            this.logger.log(`Check login state: userId ${userId}`);
            return { success: true, data: {} };
        }
        catch (e) {
            return { success: false, msg: e.toString() };
        }
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('checkLoginState'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkLoginState", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map