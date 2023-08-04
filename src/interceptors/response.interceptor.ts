// response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response) => {
        let message: string;
        const statusCode = context.switchToHttp().getResponse().statusCode;

        if (response && response.message) {
          message = response.message;
        } else {
          switch (request.method) {
            case 'POST':
              message = 'Created';
              break;
            case 'PUT':
            case 'PATCH':
              message = 'Updated';
              break;
            case 'DELETE':
              message = 'Deleted';
              break;
            default:
              message = 'Success';
          }
        }

        return {
          statusCode,
          message,
          data: response.data || response,
        };
      }),
    );
  }
}
