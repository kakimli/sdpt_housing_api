import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post,
  UsePipes,
  Session
} from "@nestjs/common";
import { CreateRoommateDto } from "./dto/create-roommate.dto";
import { RoommateService } from "./roommate.service";
import { ValidationPipe } from '@nestjs/common';
import { SearchRoommateDto } from "./dto/search-roommate.dto";
import { UserService } from "src/User/user.service";

@Controller('roommate')
export class RoommateController {
  constructor(
    private roommateService: RoommateService,
    private userService: UserService
  ) {}

  @Get()
  async getAllPosts() {
    const allPosts = await this.roommateService.findAll();
    return allPosts;
  }

  @Post('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchPosts(@Body() searchRoommateDto: SearchRoommateDto) {
    const posts = await this.roommateService.searchPost(searchRoommateDto);
    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    const post = await this.roommateService.getPostById(id);
    if (!post) return { success: false, msg: 'post_not_exist' }
    return { success: true, data: post };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Body() createRoommateDto: CreateRoommateDto,
    @Session() session: Record<string, any>
  ) {
    if (!session.userId) return { success: false, msg: 'no_user_id' };
    const user = await this.userService.findUser(session.userId);
    if (!user) return { success: false, msg: 'user_not_exist' };
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
    }
    const params = Object.assign({}, createRoommateDto, otherParams);
    const post = await this.roommateService.create(params);
    return { success: true, data: post };
  }
}