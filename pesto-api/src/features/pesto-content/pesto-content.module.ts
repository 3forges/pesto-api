import { Module } from '@nestjs/common';
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

@Module({
  controllers: [PestoContentController],
  providers: [
    PestoContentService,
    PestoContentsResolver,
    // PestoContentListResolver,
  ],
  imports: [
    // registers the controller into the module
    MongooseModule.forFeature([
      { name: PestoContent.name, schema: PestoContentSchema },
      { name: PestoProject.name, schema: PestoProjectSchema },
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
  ],
})
export class PestoContentModule {}
