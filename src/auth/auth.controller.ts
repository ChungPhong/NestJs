import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth') // route
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() //Không muốn check JWT thì dùng Public
  @UseGuards(LocalAuthGuard) // người dùng phải gửi đúng username và password
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard) // phải gửi kèm theo accesstoken
  // @Public()
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
