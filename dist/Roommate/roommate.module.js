"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoommateModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const roommate_controller_1 = require("./roommate.controller");
const roommate_service_1 = require("./roommate.service");
const roommate_schema_1 = require("./schemas/roommate.schema");
const counter_schema_1 = require("../Housing/schemas/counter.schema");
const user_service_1 = require("../User/user.service");
const user_schema_1 = require("../User/schemas/user.schema");
const axios_1 = require("@nestjs/axios");
let RoommateModule = class RoommateModule {
};
RoommateModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: roommate_schema_1.Roommate.name, schema: roommate_schema_1.RoommateSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: counter_schema_1.Counter.name, schema: counter_schema_1.CounterSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            axios_1.HttpModule
        ],
        controllers: [roommate_controller_1.RoommateController],
        providers: [roommate_service_1.RoommateService, user_service_1.UserService],
    })
], RoommateModule);
exports.RoommateModule = RoommateModule;
//# sourceMappingURL=roommate.module.js.map