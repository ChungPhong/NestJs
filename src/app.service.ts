import { Injectable } from '@nestjs/common';

@Injectable() // Nhà cung cấp
export class AppService {
  getHello(): string {
    return 'Hello World! 123';
  }
}
