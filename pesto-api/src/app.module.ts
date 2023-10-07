import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PestoContentTypeModule } from 'src/features/pesto-content-type/pesto-content-type.module';
import { PestoProjectModule } from 'src/features/pesto-project/pesto-project.module';

const mongooseUrl: string =
  `${process.env.PESTO_MONGODB_URL}` || 'mongodb://localhost/nest';
console.log(` PESTO_MONGODB_URL = [${mongooseUrl}]`);
// const other: string = `mongodb://${process.env.PESTO_USER}:${process.env.PESTO_SECRET}@mongo.pesto.io/pesto`
@Module({
  imports: [
    MongooseModule.forRoot(mongooseUrl),
    PestoContentTypeModule,
    PestoProjectModule,
  ],
  // imports: [PestoContentTypeModule],
  // exports: [PestoContentTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
// export PestoContentTypeModule;
export class AppModule {}
