import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';

import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { PestoContentTypesResolver } from 'src/features/pesto-content-type/schemas/PestoContentType.resolver';
import { PestoContentsResolver } from 'src/features/pesto-content/schemas/PestoContent.resolver';
import { PestoProjectsResolver } from 'src/features/pesto-project/schemas/PestoProject.resolver';

export const generateSchema = async () => {
  /*** */
  // const app = await NestFactory.create<NestFastifyApplication>(
  // new FastifyAdapter(),
  // {
  //     rawBody: true,
  //     bodyParser: false,
  // },
  // );
  /*** */
  // const app = await NestFactory.create<NestFastifyApplication>(
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([
    PestoProjectsResolver,
    PestoContentTypesResolver,
    PestoContentsResolver,
  ]);
  const outputPath = './src/generated.graphql.gql';

  writeFileSync(outputPath, printSchema(schema), { encoding: 'utf8' });

  console.log(` PESTO + PESTO + PESTO + generated graphql schema`);
  console.log(printSchema(schema));

  await app.close();
  console.log(` PESTO + PESTO + PESTO + APRES DE FERMER LA DB`);
  process.exit(0);
};
generateSchema();
