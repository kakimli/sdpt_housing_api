import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

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
      return userId;
    } catch (e) {
      return { success: false, msg: e.toString() };
    }
  }

  @Get('checkLoginState')
  async checkLoginState(@Session() session: Record<string, any>) {
    try {
      console.log('checkLoginState:', session)
      const userId = session.userId;
      console.log('session.userId', session.userId);
      if (!userId) return { success: false, msg: 'not_userId' };
      const user = this.userService.findUser(userId);
      if (!user) return { success: false, msg: 'user_not_exist' };
      return { success: true, data: {} };
    } catch (e) {
      return { success: false, msg: e.toString() };
    }
  }

}
