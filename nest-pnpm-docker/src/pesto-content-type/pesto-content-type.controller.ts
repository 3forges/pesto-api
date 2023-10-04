import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  // RawBodyRequest,
  // Req,
} from '@nestjs/common';
import { CreatePestoContentTypeDto } from 'src/content/dto/create-pesto-content-type.dto';
import { UpdatePestoContentTypeDto } from 'src/content/dto/update-pesto-content-type.dto';
import { PestoContentTypeService } from 'src/pesto-content-type/pesto-content-type.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@Controller('pesto-content-type')
export class PestoContentTypeController {
  constructor(private readonly service: PestoContentTypeService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

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

  @Post()
  @HttpCode(204)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoContentType: CreatePestoContentTypeDto) {
    const jsonPayload = createPestoContentType; // returns a `Buffer`.
    console.log(` >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    console.log(jsonPayload);
    console.log(` >>>>>>>>>>>>>>>> FIN`);
    console.log(createPestoContentType.identifier);
    console.log(createPestoContentType.description);
    console.log(createPestoContentType.title);
    return await this.service.create(createPestoContentType);
  }

  /**
   * @param id l'Id du type de contenu à modifier
   * @param updatePestoContentType la payload de la requête reçue
   * @returns Le type de conteu modifié
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePestoContentType: UpdatePestoContentTypeDto,
  ) {
    return await this.service.update(id, updatePestoContentType);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(`Ouais ok c'est le DELETE [${id}]`)
    return await this.service.delete(id);
  }
}
