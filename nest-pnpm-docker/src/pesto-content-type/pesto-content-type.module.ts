import { Module } from '@nestjs/common';
import { PestoContentTypeController } from './pesto-content-type.controller';
import { PestoContentTypeService } from './pesto-content-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContentType,
  PestoContentTypeSchema,
} from 'src/content/schemas/PestoContentType.schema';

@Module({
  controllers: [PestoContentTypeController],
  providers: [PestoContentTypeService],
  imports: [
    // registers the contorller into the module
    MongooseModule.forFeature([
      { name: PestoContentType.name, schema: PestoContentTypeSchema },
    ]),
  ],
})
export class PestoContentTypeModule {}
