import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import {
  Permission,
  PermissionDocument,
} from 'src/permissions/schemas/permission.entity';
import { Role, RoleDocument } from 'src/roles/schemas/role.entity';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);
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

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.userModel.count({});
      const countPermission = await this.permissionModel.count({});
      const countRole = await this.roleModel.count({});

      // create permissions
      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      //create role
      if (countRole === 0) {
        const permission = await this.permissionModel.find({}).select('_id');
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Admin thì full quyền',
            isActive: true,
            permissions: permission,
          },
          {
            name: USER_ROLE,
            description: 'Người dùng/Ứng viên sử dụng hệ thống',
            isActive: true,
            permissions: [], //không sét quyền, chỉ cần add ROLE
          },
        ]);
      }
      if (countUser === 0) {
        const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        await this.userModel.insertMany([
          {
            name: "I'm admin",
            email: 'admin@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 69,
            gender: 'MALE',
            address: 'VietNam',
            role: adminRole?._id,
          },
          {
            name: "I'm chung phong",
            email: 'chungphong@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 69,
            gender: 'MALE',
            address: 'VietNam',
            role: adminRole?._id,
          },
          {
            name: "I'm normal",
            email: 'user@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 69,
            gender: 'MALE',
            address: 'VietNam',
            role: userRole?._id,
          },
        ]);
      }
      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        this.logger.log('>>>ALREADY INIT SAMPLE DATA');
      }
    }
  }
}
