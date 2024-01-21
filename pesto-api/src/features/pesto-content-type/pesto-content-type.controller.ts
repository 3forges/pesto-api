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
import {
  PestoContentTypeDeletionResponse,
  PestoContentTypeService,
} from './pesto-content-type.service';
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
  @Get('/name/:name')
  async findByName(@Param('name') name: string) {
    return await this.service.findOneByName(name);
  }

  @Get('/uri/:git_ssh_uri')
  async findByURI(@Param('git_ssh_uri') git_ssh_uri: string) {
    return await this.service.findOneByGitSshUri(git_ssh_uri);
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
    console.log(` >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(createPestoContentType.description);
    console.log(createPestoContentType.name);
    console.log(createPestoContentType.git_service_provider);
    console.log(createPestoContentType.git_ssh_uri);

    return await this.service.create(createPestoContentType);
  }

  /**
   * @param id l'Id du type de contenu à modifier
   * @param updatePestoContentType la payload de la requête reçue
   * @returns Un tableau formé du PestoContentType modifié
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
    @Body() updatePestoContentType: UpdatePestoContentTypeDto,
  ) {
    console.log(
      ` PESTO PROJECT REST CONTROLLER - PUT - received payload :`,
      updatePestoContentType,
    );
    return await this.service.update(id, updatePestoContentType);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<PestoContentTypeDeletionResponse> {
    console.log(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
