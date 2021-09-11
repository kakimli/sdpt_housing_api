import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post,
  UsePipes,
  Session,
  Logger
} from "@nestjs/common";
import { CreateDemandDto } from "./dto/create-demand.dto";
import { DemandService } from "./demand.service";
import { ValidationPipe } from '@nestjs/common';
import { SearchDemandDto } from "./dto/search-demand.dto";
import { UserService } from "src/User/user.service";
import config from "src/config";

@Controller('demand')
export class DemandController {
  constructor(
    private demandService: DemandService,
    private userService: UserService
  ) {}

  private readonly logger = new Logger(DemandController.name);

  @Get()
  async getAllPosts(
    @Param('page') page: number,
    @Param('limit') limit: number
  ) {
    page = page || 0;
    limit = limit || 50;
    const allPosts = await this.demandService.findAll(page, limit);
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
    if (user.postCount >= config.maxPostCount) {
      this.logger.log(`Create exceed max post count: userId ${user.userId}`)
      return { success: false , msg: 'exceed_max_post_count' };
    }
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
    await this.userService.incrementPostCount(authorId);
    return { success: true, data: post };
  }
}