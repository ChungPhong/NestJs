import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  //Tạo mới
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      name: createUserDto.name,
    });
    return user;
  }

  //Check user password
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  findAll() {
    return `This action returns all users`;
  }

  //Tìm user
  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`;
    return this.userModel.findOne({
      _id: id,
    });
  }

  //
  findOneByUserName(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }

  // Cập nhật
  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      { ...updateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`;
    return this.userModel.softDelete({
      _id: id,
    });
  }
}
