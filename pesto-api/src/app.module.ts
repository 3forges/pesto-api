import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PestoContentTypeModule } from 'src/features/pesto-content-type/pesto-content-type.module';
import { PestoContentModule } from './features/pesto-content/pesto-content.module';
import { PestoProjectModule } from './features/pesto-project/pesto-project.module';
import { PestoProjectsResolver } from './features/pesto-project/schemas/PestoProject.resolver';
import { PestoContentTypesResolver } from './features/pesto-content-type/schemas/PestoContentType.resolver';
import { PestoContentsResolver } from './features/pesto-content/schemas/PestoContent.resolver';

const mongooseUrl: string =
  `${process.env.PESTO_MONGODB_URL}` || 'mongodb://localhost/nest';
console.log(` PESTO_MONGODB_URL = [${mongooseUrl}]`);
// const other: string = `mongodb://${process.env.PESTO_USER}:${process.env.PESTO_SECRET}@mongo.pesto.io/pesto`
@Module({
  imports: [
    MongooseModule.forRoot(mongooseUrl),
    PestoContentTypeModule,
    PestoContentModule,
    PestoProjectModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'src/graphql.ts',
      driver: ApolloDriver,
      playground: true,
    }),
  ],
  // imports: [PestoContentTypeModule],
  // exports: [PestoContentTypeModule],
  controllers: [AppController],
  providers: [
    AppService,
    PestoProjectsResolver,
    PestoContentTypesResolver,
    PestoContentsResolver,
  ],
  // providers: [FooResolver], //< This
})
// export PestoContentTypeModule;
export class AppModule {}
