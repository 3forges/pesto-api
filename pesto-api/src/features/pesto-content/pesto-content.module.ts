import { Module } from '@nestjs/common';
import { PestoContentController } from './pesto-content.controller';
import { PestoContentService } from './pesto-content.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PestoContent,
  PestoContentSchema,
} from './schemas/PestoContent.schema';

@Module({
  controllers: [PestoContentController],
  providers: [PestoContentService],
  imports: [
    // registers the contorller into the module
    MongooseModule.forFeature([
      { name: PestoContent.name, schema: PestoContentSchema },
    ]),
  ],
})
export class PestoContentModule {}
