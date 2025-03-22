import { Module } from '@nestjs/common';
import { TsToJSonSchemaController } from './ts-to-jsonschema.controller';
import { TsToJSonSchemaService } from './ts-to-jsonschema.service';

@Module({
  controllers: [TsToJSonSchemaController],
  providers: [TsToJSonSchemaService],
})
export class TsToJSonSchemaModule {}
