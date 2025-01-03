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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
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
