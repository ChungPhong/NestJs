import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

//class = object
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsArray({ message: 'skills có định dạng là array' })
  @IsString({ each: true, message: 'skills định dạng là string' })
  skills: string[];

  //Validate 1 biến object
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'salary không được để trống' })
  salary: number;

  @IsNotEmpty({ message: 'location không được để trống' })
  location: string;

  @IsNotEmpty({ message: 'quantity không được để trống' })
  quantity: string;

  @IsNotEmpty({ message: 'level không được để trống' })
  level: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'startDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate có định dạng là Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate có định dạng là Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsBoolean({ message: 'isActive có định dạng là boolean' })
  isActive: boolean;
}
