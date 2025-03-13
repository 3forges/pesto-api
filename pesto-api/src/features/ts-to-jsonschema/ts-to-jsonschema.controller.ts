import {
  Body,
  Controller,
  // Get,
  Post,
  HttpCode,
  // RawBodyRequest,
  // Req,
} from '@nestjs/common';

import {
  // PestoContentTypeDeletionResponse,
  TsToJSonSchemaService,
} from './ts-to-jsonschema.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@Controller('ts-to-jsonschema')
export class TsToJSonSchemaController {
  constructor(private readonly service: TsToJSonSchemaService) {}

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

  /**
   * export JSON_PAYLOAD='{ "tsInterfaceAsStr" : "export interface JBL { name?: string; }" }'
   * curl -iv -d "$JSON_PAYLOAD" -X POST -H "Content-Type: application/json" -H 'Accept: application/json' http://api.pesto.io:3000/ts-to-jsonschema | tail -n 1 | jq .schema
   * -
   * @param tsInterfaceToConvertPayload
   * @returns the Zod Schema
   */
  @Post()
  // @HttpCode(204) // IF HTTP code is 204, NestJS will not return the created object!, This makes sense due to semantics of HTTP 204: no content
  // @HttpCode(201)
  @HttpCode(200)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async convertToZod(
    @Body() tsInterfaceToConvertPayload: { tsInterfaceAsStr: string },
  ) {
    const jsonPayload: { tsInterfaceAsStr: string } =
      tsInterfaceToConvertPayload; // returns a `Buffer`.
    console.log(` >>> [TsToJSonSchemaController] >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    // console.log(jsonPayload);
    console.log(
      ` >>> [TsToJSonSchemaController] >>>>>>>>>>>>>>>> JSON.stringify(jsonPayload, null, 2) is:`,
    );
    console.log(JSON.stringify(jsonPayload, null, 2));
    console.log(` >>> [TsToJSonSchemaController] >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(
      ` >>> [TsToJSonSchemaController] >>>>>>>>>>>>>>>> jsonPayload.tsInterfaceAsStr is ${jsonPayload.tsInterfaceAsStr}`,
    );
    return await this.service.convertToZod(jsonPayload.tsInterfaceAsStr);
  }
}
