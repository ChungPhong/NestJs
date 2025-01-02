import { Controller, Delete, Get } from '@nestjs/common';

@Controller('user') //  /user
export class UserController {
  @Get() // GET => "/" === /user/
  findAll(): string {
    return 'This action returns all users';
  }

  @Get('/by-id')
  findById(): string {
    return 'This action will delete a user by id';
  }
}
