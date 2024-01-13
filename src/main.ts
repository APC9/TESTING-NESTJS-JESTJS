import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validaciones Globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Manejo de errores de forma global
  app.useGlobalFilters(new AllExceptionsFilter());

  //Interceptor global
  //app.useGlobalInterceptors(new TransformDataInterceptor());

  await app.listen(3000);
}
bootstrap();
