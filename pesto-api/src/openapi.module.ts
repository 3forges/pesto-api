import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import {
  // closeInMongodConnection,
  rootMongooseTestModule,
} from './openapi.db.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PestoContentTypeModule } from 'src/features/pesto-content-type/pesto-content-type.module';
// import { PestoContentModule } from './features/pesto-content/pesto-content.module';
import { PestoProjectModule } from './features/pesto-project/pesto-project.module';

/*
const mongooseUrl: string =
  `${process.env.PESTO_MONGODB_URL}` || 'mongodb://localhost/nest';
console.log(` PESTO_MONGODB_URL = [${mongooseUrl}]`);
*/
// const other: string = `mongodb://${process.env.PESTO_USER}:${process.env.PESTO_SECRET}@mongo.pesto.io/pesto`
@Module({
  imports: [
    // MongooseModule.forRoot(mongooseUrl),
    // InMemoryDBModule.forRoot({}),
    /*
    rootMongooseTestModule({
      auth: {
        username: ` ${process.env.PESTO_USER}`,
        password: ` ${process.env.PESTO_SECRET}`,
      },
      authMechanism: 'DEFAULT',
      // autoCreate: true,
      // authSource: `pesto`,
    }),
    */
    rootMongooseTestModule({}),
    PestoContentTypeModule,
    // PestoContentModule,
    PestoProjectModule,
  ],
  // imports: [PestoContentTypeModule],
  // exports: [PestoContentTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
// export PestoContentTypeModule;
export class OpenApi {}
