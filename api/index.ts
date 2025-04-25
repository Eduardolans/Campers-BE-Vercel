// import createServer from '@vendia/serverless-express';
// import proxy from '@vendia/serverless-express';
// import { AppModule } from '../dist/src/app.module';
// import { NestFactory } from '@nestjs/core';

// let server: any;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.init();
//   return createServer(app.getHttpAdapter().getInstance());
// }

// export const handler = async (event: any, context: any) => {
//   if (!server) {
//     server = await bootstrap();
//   }
//   return proxy({ server, event, context, promise: 'PROMISE' } as any);
// };

import createServer from '@vendia/serverless-express';
import proxy from '@vendia/serverless-express';
import { AppModule } from '../src/app.module'; // Importa SIEMPRE desde src, nunca dist
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '../src/common/exception.filter';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

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

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.init();
  return createServer(app.getHttpAdapter().getInstance());
}

export const handler = async (event: any, context: any) => {
  if (!server) {
    server = await bootstrap();
  }
  return proxy({ server, event, context, promise: 'PROMISE' } as any);
};
