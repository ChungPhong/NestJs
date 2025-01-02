import { Injectable } from '@nestjs/common';

@Injectable() // Nhà cung cấp
export class AppService {
  getHello(): string {

    //Thêm code modal ở đây
    return 'Hello World! 123';
  }
}
