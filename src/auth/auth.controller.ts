import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}


  @Post('login')
  async login(@Body() loginDto: Record<string, any>) {
    return this.authService.signIn(loginDto?.email, loginDto?.password);
  }

  // @Post('login')
  // async login(@Req() request) {
  //   // 先判断账密是否正确， 生成新的token
  //   const {user} = request;
  //   const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
  //   const { token: refreshToken, cookie: refreshTokenCookie } = this.authService.getCookieWithJwtRefreshToken(user.id);

  //   // 登录后会更新数据库中refreshToken
  //   await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

  //   request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
  //   return user;
  // }
}
