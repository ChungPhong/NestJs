import { IsEmail, IsNotEmpty } from 'class-validator';

//class = object
export class CreateUserDto {
  @IsEmail({}, { message: 'Email khoong dung dinh dang' })
  @IsNotEmpty({
    message: 'Email khong duoc de trong',
  })
  email: string;

  @IsNotEmpty()
  password: string;

  name: string;
  address: string;
}
