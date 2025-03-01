import {
  Body,
  Controller,
  Get,
  HttpCode,
  // RawBodyRequest,
  // Req,
} from '@nestjs/common';

import {
  // PestoContentTypeDeletionResponse,
  TsToZodService,
} from './ts-to-zod.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@Controller('ts-to-zod')
export class TsToZodController {
  constructor(private readonly service: TsToZodService) {}

  /**
  @Post()
  @HttpCode(204)
  async create(@Body() createPestoContentType: CreatePestoContentTypeDto) {
    console.log(
      `Et voici le body reçu dans le [[/pesto-content-type] POST] : [${createPestoContentType}] `,
    );
    console.log(createPestoContentType);
    return await this.service.create(createPestoContentType);
  }


  */

  @Get()
  // @HttpCode(204) // IF HTTP code is 204, NestJS will not return the created object!, This makes sense due to semantics of HTTP 204: no content
  // @HttpCode(201)
  @HttpCode(200)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(
    @Body() tsInterfaceToConvertPayload: { tsInterfaceAsStr: string },
  ) {
    const jsonPayload = tsInterfaceToConvertPayload; // returns a `Buffer`.
    console.log(` >>> [TsToZodController] >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    console.log(jsonPayload);
    console.log(` >>> [TsToZodController] >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(tsInterfaceToConvertPayload.tsInterfaceAsStr);
    return await this.service.convertToZod(
      tsInterfaceToConvertPayload.tsInterfaceAsStr,
    );
  }
}
