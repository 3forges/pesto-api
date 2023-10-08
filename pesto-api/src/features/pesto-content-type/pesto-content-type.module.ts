import { Module } from '@nestjs/common';
import { PestoContentTypeController } from './pesto-content-type.controller';
import { PestoContentTypeService } from './pesto-content-type.service';
import { PestoProjectService } from './../pesto-project/pesto-project.service';
import { PestoProjectModule } from './../pesto-project/pesto-project.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContentType,
  PestoContentTypeSchema,
} from './schemas/PestoContentType.schema';
import {
  PestoProject,
  PestoProjectSchema,
} from '../pesto-project/schemas/PestoProject.schema';

@Module({
  controllers: [PestoContentTypeController],
  providers: [PestoContentTypeService, PestoProjectService],
  imports: [
    PestoProjectModule,
    // registers the controller into the module
    MongooseModule.forFeature([
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
    MongooseModule.forFeature([
      { name: PestoProject.name, schema: PestoProjectSchema },
    ]),
  ],
})
export class PestoContentTypeModule {}
