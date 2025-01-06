import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

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
  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
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
