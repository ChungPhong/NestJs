import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next // Nó sẽ lấy kết quả của controller để trả ra
      .handle()
      .pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
        //   message: data.message,
          data: data,
        })),
      );
  }
}
