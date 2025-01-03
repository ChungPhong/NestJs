import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard) // người dùng phải gửi đúng username và password
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard) // phải gửi kèm theo accesstoken
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // @UseGuards(JwtAuthGuard) // phải gửi kèm theo accesstoken
  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }
  // @Get()
  // @Render('home')
  // handleHomePage() {
  //   //port from .env
  //   console.log('>>>check port = ', this.configService.get<string>('PORT'));
  //   const message = this.appService.getHello();
  //   return {
  //     message: message,
  //   };
  //   // return 'this.appService.getHello()';
  // }
}
