import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //username/ pass là 2 tham số thư viện passport nó ném về
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, name, email, role } = user;
    const payload = {
      sub: 'token login', //Nội dung token
      iss: 'from server', //Người tạo ra token
      _id,
      name,
      email,
      role,
    };
    //Tạo ra token
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      name,
      email,
      role,
    };
  }

  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);
    return { //Phan hoi ve client
      _id: newUser?.id,
      createdAt: newUser.createdAt,
    };
  }
}
