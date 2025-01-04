import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('>>>>>username: ', username);
    console.log('>>>>>password: ', password);
    console.log('>>>>>User: ', user);

    if (!user) {
      throw new UnauthorizedException('Username/password không hợp lệ'); //nhập sai tài khoản hoặc mật khẩu nó sẽ bắn ra
    }
    return user;
  }
}
