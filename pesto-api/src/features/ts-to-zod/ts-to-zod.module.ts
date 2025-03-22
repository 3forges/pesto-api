import { Module } from '@nestjs/common';
import { TsToZodController } from './ts-to-zod.controller';
import { TsToZodService } from './ts-to-zod.service';

@Module({
  controllers: [TsToZodController],
  providers: [TsToZodService],
})
export class TsToZodModule {}
