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
import { CreatePestoContentDto } from './dto/create-pesto-content.dto';
import { UpdatePestoContentDto } from './dto/update-pesto-content.dto';
import {
  PestoContentDeletionResponse,
  PestoContentService,
} from './pesto-content.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

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
  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return await this.service.findOneByName(name);
  }

  @Get('/project/:project_id')
  async findByProjectID(@Param('project_id') project_id: string) {
    return await this.service.findAllByProjectID(project_id);
  }

  @Get('/content-type/:content_type_id')
  async findByContentTypeID(@Param('content_type_id') content_type_id: string) {
    return await this.service.findAllByContentTypeID(content_type_id);
  }

  /**
  @Post()
  @HttpCode(204)
  async create(@Body() createPestoContent: CreatePestoContentDto) {
    console.log(
      `Et voici le body reçu dans le [[/pesto-content-type] POST] : [${createPestoContent}] `,
    );
    console.log(createPestoContent);
    return await this.service.create(createPestoContent);
  }


  */

  @Post()
  @HttpCode(204)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoContent: CreatePestoContentDto) {
    const jsonPayload = createPestoContent; // returns a `Buffer`.
    console.log(` >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    console.log(JSON.stringify(jsonPayload, null, 4));
    console.log(` >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(createPestoContent.project_id);
    console.log(createPestoContent.content_type_id);
    console.log(createPestoContent.markdown_content);
    console.log(createPestoContent.name);
    console.log(createPestoContent.frontmatter);

    return await this.service.create(createPestoContent);
  }

  /**
   * @param id l'Id du type de contenu à modifier
   * @param updatePestoContent la payload de la requête reçue
   * @returns Un tableau formé du PestoContent modifié
   *
   * @example
   *       export EG_PAYLOAD='{
   *           "_id": "6526bb5cf88cd05417311b33",
   *           "name": "autrement",
   *           "git_ssh_uri": "git@github.com:fundefinedjskh/rqfxy",
   *           "description": "msrnjusm juykm yloyrjjli",
   *           "createdAt": "2023-10-11T15:12:28.604Z"
   *       }'
   *       export PRJ_ID="6526bb5cf88cd05417311b33"
   *       curl -iv \
   *         -X PUT \
   *         -H 'Content-Type: application/json' \
   *         -H 'Accept: application/json' \
   *         -d "${EG_PAYLOAD}" \
   *         http://localhost:3000/pesto-content-type/${PRJ_ID} | tail -n 1 | jq .
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updatePestoContent: UpdatePestoContentDto,
  ) {
    console.log(
      ` PESTO CONTENT REST CONTROLLER - PUT - received payload :`,
      updatePestoContent,
    );
    return await this.service.update(id, updatePestoContent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PestoContentDeletionResponse> {
    console.log(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
