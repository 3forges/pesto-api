import { Module } from '@nestjs/common';
import { PestoContentTypeController } from './pesto-content-type.controller';
import { PestoContentTypeService } from './pesto-content-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContentType,
  PestoContentTypeSchema,
} from './schemas/PestoContentType.schema';
import { PestoContentTypesResolver } from './schemas/PestoContentType.resolver';

@Module({
  controllers: [PestoContentTypeController],
  providers: [
    PestoContentTypeService,
    PestoContentTypesResolver,
    // PestoContentTypeListResolver,
  ],
  imports: [
    // registers the controller into the module
    MongooseModule.forFeature([
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
  ],
})
export class PestoContentTypeModule {}
