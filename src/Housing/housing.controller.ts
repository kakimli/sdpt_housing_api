import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post,
  UsePipes,
  Session,
  UseInterceptors,
  UploadedFile,
  Logger
} from "@nestjs/common";
import { CreateHousingDto } from "./dto/create-housing.dto";
import { HousingService } from "./housing.service";
import { ValidationPipe } from '@nestjs/common';
import { SearchHousingDto } from "./dto/search-housing.dto";
import { UserService } from "src/User/user.service";
import { Express } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { createWriteStream } from "fs";
import { join } from "path";
import config from "src/config";

@Controller('housing')
export class HousingController {
  constructor(
    private housingService: HousingService,
    private userService: UserService
  ) {}

  private readonly logger = new Logger(HousingController.name);

  @Get()
  async getAllPosts(
    @Param('page') page: number,
    @Param('limit') limit: number
  ) {
    page = page || 0;
    limit = limit || 50;
    const allPosts = await this.housingService.findAll(page, limit);
    return allPosts;
  }

  @Post('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchPosts(@Body() searchHousingDto: SearchHousingDto) {
    const posts = await this.housingService.searchPost(searchHousingDto);
    return posts;
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    //@Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: Record<string, any>
  ) {
    try {
      if (!session.userId && session.userId !== 0) {
        return { success: false, msg: 'no_user_id' };
      }
      const user = await this.userService.findUser(session.userId);
      if (!user) return { success: false, msg: 'user_not_exist' };
      if (user.postCount >= config.maxPostCount) {
        this.logger.log(`Upload exceed max post count: userId ${user.userId}`)
        return { success: false , msg: 'exceed_max_post_count' };
      }
      const dateString = this.housingService.getDateString();
      const filename = `${dateString}-${file.originalname}`;
      const writeImage = createWriteStream(join(__dirname, '..','../public/upload', `${filename}`));
      await writeImage.write(file.buffer);
      this.logger.log(`Upload ${join(__dirname, '..','../public/upload', `${filename}`)}`)
      return { success: true, data: filename };
    } catch (e) {
      return { success: false, msg: e.toString() };
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    const post = await this.housingService.getPostById(id);
    if (!post) return { success: false, msg: 'post not exist' }
    return { success: true, data: post };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Body() createHousingDto: CreateHousingDto,
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
    }
    const params = Object.assign(
      {}, createHousingDto, 
      otherParams, 
      createHousingDto.utilities,
      createHousingDto.other);
    const post = await this.housingService.create(params);
    await this.userService.incrementPostCount(authorId);
    return { success: true, data: post };
  }


}