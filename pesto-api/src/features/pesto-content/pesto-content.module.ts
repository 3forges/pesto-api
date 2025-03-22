import { Logger as NestJsLogger, Module } from '@nestjs/common';
import { Logger } from 'winston';
import { PestoContentController } from './pesto-content.controller';
import { PestoContentService } from './pesto-content.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContent,
  PestoContentSchema,
} from './schemas/PestoContent.schema';
import {
  PestoProject,
  PestoProjectSchema,
} from '../pesto-project/schemas/PestoProject.schema';
import {
  PestoContentType,
  PestoContentTypeSchema,
} from '../pesto-content-type/schemas/PestoContentType.schema';

import { PestoContentsResolver } from './schemas/PestoContent.resolver';
import { PestoContentTypeService } from '../pesto-content-type/pesto-content-type.service';
import { WinstonModule } from 'nest-winston';

@Module({
  controllers: [PestoContentController],
  providers: [
    PestoContentService,
    PestoContentsResolver,
    // PestoContentListResolver,
    PestoContentTypeService,
    Logger,
    NestJsLogger,
  ],
  imports: [
    // registers the controller into the module
    WinstonModule.forRoot({
      // options
    }),
    MongooseModule.forFeature([
      { name: PestoContent.name, schema: PestoContentSchema },
      { name: PestoProject.name, schema: PestoProjectSchema },
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
  ],
})
export class PestoContentModule {}
