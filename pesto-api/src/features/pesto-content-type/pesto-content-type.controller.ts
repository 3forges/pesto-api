import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  UsePipes,
  ValidationPipe,
  // RawBodyRequest,
  // Req,
} from '@nestjs/common';
import { CreatePestoContentTypeDto } from './dto/create-pesto-content-type.dto';
import { UpdatePestoContentTypeDto } from './dto/update-pesto-content-type.dto';
import { PestoContentTypeService } from './pesto-content-type.service';
import { ApiResponse } from '@nestjs/swagger';
import { PestoContentType } from './schemas/PestoContentType.schema';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@Controller('pesto-content-type')
export class PestoContentTypeController {
  constructor(private readonly service: PestoContentTypeService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns al of the PestoContentType s ',
    // type: Array<PestoContentType>,
    type: PestoContentType,
    isArray: true,
  })
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

  @Post()
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoContentType: CreatePestoContentTypeDto) {
    // const jsonPayload = createPestoContentType; // returns a `Buffer`.
    console.log(` >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    console.log(createPestoContentType);
    console.log(` >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(createPestoContentType.identifier);
    console.log(createPestoContentType.description);
    console.log(createPestoContentType.title);
    console.log(
      `frontmatter_format`,
      createPestoContentType.frontmatter_format,
    );
    console.log(
      `frontmatter_schema`,
      createPestoContentType.frontmatter_schema,
    );

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
    console.log(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
