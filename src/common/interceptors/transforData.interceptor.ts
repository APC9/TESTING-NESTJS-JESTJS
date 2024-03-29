import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class TransformDataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        console.log('metodo GET interceptado');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data = 'Interceptado';
        return data;
      }),
    );
  }
}
