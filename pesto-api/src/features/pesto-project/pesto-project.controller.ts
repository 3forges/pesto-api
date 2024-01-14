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
import { CreatePestoProjectDto } from './dto/create-pesto-project.dto';
import { UpdatePestoProjectDto } from './dto/update-pesto-project.dto';
import {
  PestoProjectDeletionResponse,
  PestoProjectService,
} from './pesto-project.service';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';

@Controller('pesto-project')
export class PestoProjectController {
  constructor(private readonly service: PestoProjectService) {}

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
  async create(@Body() createPestoProject: CreatePestoProjectDto) {
    console.log(
      `Et voici le body reçu dans le [[/pesto-content-type] POST] : [${createPestoProject}] `,
    );
    console.log(createPestoProject);
    return await this.service.create(createPestoProject);
  }


  */

  @Post()
  @HttpCode(204)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoProject: CreatePestoProjectDto) {
    const jsonPayload = createPestoProject; // returns a `Buffer`.
    console.log(` >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    console.log(jsonPayload);
    console.log(` >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    console.log(createPestoProject.description);
    console.log(createPestoProject.name);
    console.log(createPestoProject.git_service_provider);
    console.log(createPestoProject.git_ssh_uri);

    return await this.service.create(createPestoProject);
  }

  /**
   * @param id l'Id du type de contenu à modifier
   * @param updatePestoProject la payload de la requête reçue
   * @returns Un tableau formé du PestoProject modifié
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
   *         http://localhost:3000/pesto-project/${PRJ_ID} | tail -n 1 | jq .
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updatePestoProject: UpdatePestoProjectDto,
  ) {
    console.log(
      ` PESTO PROJECT REST CONTROLLER - PUT - received payload :`,
      updatePestoProject,
    );
    return await this.service.update(id, updatePestoProject);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PestoProjectDeletionResponse> {
    console.log(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
