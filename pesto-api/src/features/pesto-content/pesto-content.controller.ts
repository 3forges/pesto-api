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
import { CreatePestoContentDto } from './dto/create-pesto-content.dto';
import { UpdatePestoContentDto } from './dto/update-pesto-content.dto';
import { PestoContentService } from './pesto-content.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

const logs_prefix = `PESTO-CONTENT-TYPE CONTROLLER - `;

@Controller('pesto-content')
export class PestoContentController {
  constructor(private readonly service: PestoContentService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Get('/project/:project_id')
  async findByProject(@Param('project_id') project_id: string) {
    return await this.service.findByProject(project_id);
  }

  /**
  @Post()
  @HttpCode(204)
  async create(@Body() createPestoContent: CreatePestoContentDto) {
    console.log(
      `Et voici le body reçu dans le [[/pesto-content] POST] : [${createPestoContent}] `,
    );
    console.log(createPestoContent);
    return await this.service.create(createPestoContent);
  }


  */

  @Post()
  @HttpCode(204)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoContent: CreatePestoContentDto) {
    // const jsonPayload = createPestoContent; // returns a `Buffer`.
    console.log(
      `${logs_prefix} [POST] method - >>>>>>>>>>>>>>>> DEBUT JSON RECU: `,
    );
    console.log(createPestoContent);
    console.log(
      `${logs_prefix} [POST] method - >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`,
    );
    console.log(
      `${logs_prefix} [POST] method - content_type_id : `,
      createPestoContent.content_type_id,
    );
    console.log(
      `${logs_prefix} [POST] method - project_id :`,
      createPestoContent.project_id,
    );
    console.log(
      `${logs_prefix} [POST] method - description:`,
      createPestoContent.description,
    );
    console.log(
      `${logs_prefix} [POST] method - text: `,
      createPestoContent.text,
    );
    console.log(
      `${logs_prefix} [POST] method - name: `,
      createPestoContent.name,
    );
    return await this.service.create(createPestoContent);
  }

  /**
   * @param id l'Id du type de contenu à modifier
   * @param updatePestoContent la payload de la requête reçue
   * @returns Le type de conteu modifié
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePestoContent: UpdatePestoContentDto,
  ) {
    return await this.service.update(id, updatePestoContent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
