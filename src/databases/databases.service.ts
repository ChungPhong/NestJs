import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import {
  Permission,
  PermissionDocument,
} from 'src/permissions/schemas/permission.entity';
import { Role, RoleDocument } from 'src/roles/schemas/role.entity';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,

    //Lấy động tham số bên trong file dotenv, vd: check môi trường production
    //chúng ta ko tạo fake data chúng ta chỉ tạo fake môi trường development
    private configService: ConfigService,
    private usersService: UsersService, //Sau này tạo fake user, lấy mất khẩu hash mật khẩu
  ) {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
