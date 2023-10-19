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
import {
  ApiResponse,
  ApiOperation,
  // ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';

import { PestoContentType } from './schemas/PestoContentType.schema';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@ApiTags('PestoContentType')
@Controller('pesto-content-type')
export class PestoContentTypeController {
  constructor(private readonly service: PestoContentTypeService) {}

  @ApiOperation({
    summary: 'Get all PestoContentTypes',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the PestoContentType s ',
    // type: Array<PestoContentType>,
    type: PestoContentType,
    isArray: true,
  })
  @Get()
  async index() {
    return await this.service.findAll();
  }

  @ApiOperation({
    summary: 'Get a PestoContentType by ID ([_id] in MongoDB)',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns ae [PestoContentType] from its ID ([_id] in MongoDB)',
    // type: Array<PestoContentType>,
    type: PestoContentType,
    isArray: true,
  })
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @ApiOperation({
    description: `Get all PestoContentType of a given PestoProject`,
    // response = Promise<PestoContentType[]>,
    // responses = Promise<PestoContentType[]>,
    // produces = "application/json",
    operationId: 'findByProject',
    requestBody: {
      required: false,
      //content:{},
      content: {},
    },
  })
  @Get('/project/:project_id')
  async findByProject(@Param('project_id') project_id: string) {
    return await this.service.findByProject(project_id);
  }

  @ApiOperation({
    description: `Create a {PestoContentType} of a given {PestoProject}`,
    requestBody: {
      required: true,
      //content:{},
      content: {},
    },
  })
  @Post()
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(
    @Body()
    createPestoContentType: CreatePestoContentTypeDto,
  ) {
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
