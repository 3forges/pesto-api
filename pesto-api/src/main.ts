import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  /*
  const app = await NestFactory.create(AppModule, {
    // bodyParser: true,
    rawBody: true,
    // rawBody: false,
    bodyParser: true,
  });*/
  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
      bodyParser: false,
    },
  );
  app.enableCors();
  /**
   * app.useBodyParser('text');
   * */
  app.useBodyParser('text/plain');
  // app.useBodyParser('text');
  // app.useBodyParser('json');
  // app.useBodyParser('application/json');

  await app.listen(3000);
}
bootstrap();
