import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post,
  UsePipes,
  Session
} from "@nestjs/common";
import { CreateDemandDto } from "./dto/create-demand.dto";
import { DemandService } from "./demand.service";
import { ValidationPipe } from '@nestjs/common';
import { SearchDemandDto } from "./dto/search-demand.dto";
import { UserService } from "src/User/user.service";

@Controller('demand')
export class DemandController {
  constructor(
    private demandService: DemandService,
    private userService: UserService
  ) {}

  @Get()
  async getAllPosts() {
    const allPosts = await this.demandService.findAll();
    return allPosts;
  }

  @Post('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchPosts(@Body() searchDemandDto: SearchDemandDto) {
    const posts = await this.demandService.searchPost(searchDemandDto);
    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    const post = await this.demandService.getPostById(id);
    if (!post) return { success: false, msg: 'post_not_exist' }
    return { success: true, data: post };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Body() createDemandDto: CreateDemandDto,
    @Session() session: Record<string, any>
  ) {
    if (!session.userId) return { success: false, msg: 'no_user_id' };
    const user = await this.userService.findUser(session.userId);
    if (!user) return { success: false, msg: 'user_not_exist' };
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
    }
    const params = Object.assign({}, createDemandDto, otherParams);
    const post = await this.demandService.create(params);
    return { success: true, data: post };
  }
}