import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Session,
  Logger
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  private readonly logger = new Logger(UserController.name);

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>
  ) {
    try {
      const res: any = await this.userService.requestForOpenId(loginDto);
      const openId = res.data.openid;
      if (!openId) return { success: false, msg: 'wx_request_failed' };
      const username = loginDto.username;
      const userId = await this.userService.createUserIfNotExist(openId, username);
      session.userId = userId;
      this.logger.log(`Login: userId ${userId}`);
      return userId;
    } catch (e) {
      return { success: false, msg: e.toString() };
    }
  }

  @Get('checkLoginState')
  async checkLoginState(@Session() session: Record<string, any>) {
    try {
      const userId = session.userId;
      if (!userId) return { success: false, msg: 'no_userId' };
      const user = this.userService.findUser(userId);
      if (!user) return { success: false, msg: 'user_not_exist' };
      this.logger.log(`Check login state: userId ${userId}`)
      return { success: true, data: {} };
    } catch (e) {
      return { success: false, msg: e.toString() };
    }
  }

}
