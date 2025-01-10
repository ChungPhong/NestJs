import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsEmail({ message: 'email không đúng định dạng' })
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsArray({ message: 'sills có định dạng là array' })
  @IsString({ each: true, message: 'skill định dạng là string' })
  skills: string[];
}
