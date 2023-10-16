import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  /**
   * swagger/openapi
   * https://docs.nestjs.com/openapi/introduction
   */
  const config = new DocumentBuilder()
    .setTitle('Pesto Example | PestoContentType Example')
    .setDescription('The Pesto API description')
    .setVersion('1.0')
    .addTag('pesto')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
