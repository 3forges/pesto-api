import { Module } from '@nestjs/common';
import { PestoContentController } from './pesto-content.controller';
import { PestoContentService } from './pesto-content.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContent,
  PestoContentSchema,
} from './schemas/PestoContent.schema';
import { PestoProjectService } from './../pesto-project/pesto-project.service';
import { PestoProjectModule } from './../pesto-project/pesto-project.module';
import { PestoContentTypeService } from './../pesto-content-type/pesto-content-type.service';
import { PestoContentTypeModule } from './../pesto-content-type/pesto-content-type.module';
import {
  PestoContentType,
  PestoContentTypeSchema,
} from '../pesto-content-type/schemas/PestoContentType.schema';
import {
  PestoProject,
  PestoProjectSchema,
} from '../pesto-project/schemas/PestoProject.schema';
import { PestoContentsResolver } from './schemas/PestoContent.resolver';

@Module({
  controllers: [PestoContentController],
  providers: [
    PestoContentService,
    PestoContentTypeService,
    PestoProjectService,
    PestoContentsResolver,
  ],
  imports: [
    // registers the controller into the module
    MongooseModule.forFeature([
      { name: PestoContent.name, schema: PestoContentSchema },
    ]),
    PestoProjectModule,
    PestoContentTypeModule,
    MongooseModule.forFeature([
      { name: PestoProject.name, schema: PestoProjectSchema },
    ]),
    MongooseModule.forFeature([
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
  ],
})
export class PestoContentModule {}
