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
      // rawBody: true,
      bodyParser: true,
      rawBody: true,
      // bodyParser: true,
      /*
      httpsOptions: {
        
      },
      */
    },
  );
  app.enableCors();
  /**
   * By default, only application/json and application/x-www-form-urlencoded parsers are registered. If you want to register a different parser on the fly, you will need to do so explicitly.
   * */
  // app.useBodyParser('json');
  // app.useBodyParser('application/json');
  // app.useBodyParser('application/x-www-form-urlencoded');
  // app.useBodyParser('text/plain');
  // app.useBodyParser('text');
  // app.useBodyParser('application/json; charset=utf8');

  /**
   * swagger/openapi
   * https://docs.nestjs.com/openapi/introduction
   */
  const config = new DocumentBuilder()
    .setTitle('Pesto API')
    .setDescription(
      'The Pesto API purpose is to manage the content of your website, using the power of headless CMS. Pesto is in the Git-based CMS gang.',
    )
    .setVersion('1.0')
    .addTag('pesto')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const pestoApiHost: string = `${process.env.PESTO_API_HOST}` || '0.0.0.0';
  const pestoApiHost: string = process.env.PESTO_API_HOST || '0.0.0.0';
  console.log(` PESTO_API_HOST = [${pestoApiHost}]`);
  await app.listen(3000, pestoApiHost);
}
bootstrap();
