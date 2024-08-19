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
  // Logger,
  Inject,
  // RawBodyRequest,
  // Req,
} from '@nestjs/common';
import { Logger } from 'winston';
import { CreatePestoContentDto } from './dto/create-pesto-content.dto';
import { UpdatePestoContentDto } from './dto/update-pesto-content.dto';
import {
  PestoContentDeletionResponse,
  PestoContentService,
} from './pesto-content.service';
import { PestoContentTypeService } from '../pesto-content-type/pesto-content-type.service';
import { PestoContentType } from '../pesto-content-type/schemas/PestoContentType.schema';
//import { Request } from 'express';
// import { FastifyRequest } from 'fastify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('pesto-content')
export class PestoContentController {
  //private readonly logger = new Logger(PestoContentController.name);
  constructor(
    private readonly service: PestoContentService,
    private readonly contentTypeService: PestoContentTypeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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
    this.logger.verbose(
      `Et voici le body reçu dans le [[/pesto-content-type] POST] : [${createPestoContent}] `,
    );
    this.logger.verbose(createPestoContent);
    return await this.service.create(createPestoContent);
  }


  */

  @Post()
  @HttpCode(204)
  // async create(@Req() req: RawBodyRequest<FastifyRequest>) {
  async create(@Body() createPestoContent: CreatePestoContentDto) {
    const jsonPayload = createPestoContent; // returns a `Buffer`.
    this.logger.verbose(` >>>>>>>>>>>>>>>> DEBUT JSON RECU: `);
    this.logger.verbose(JSON.stringify(jsonPayload, null, 4));
    this.logger.verbose(` >>>>>>>>>>>>>>>> FIN JSON PAYLOAD`);
    this.logger.verbose(createPestoContent.project_id);
    this.logger.verbose(createPestoContent.content_type_id);
    this.logger.verbose(createPestoContent.markdown_content);
    this.logger.verbose(createPestoContent.name);
    this.logger.verbose(createPestoContent.frontmatter);

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
    /*
    this.logger.verbose(
      ` PESTO CONTENT REST CONTROLLER - PUT - received payload : [${JSON.stringify(
        updatePestoContent,
        null,
        4,
      )}]`,
    );
    */
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(` PESTO CONTENT REST CONTROLLER - PUT - received payload : [${JSON.stringify(updatePestoContent,null,4)}]`);
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(` PESTO CONTENT REST CONTROLLER - PUT - received payload : [${JSON.stringify(updatePestoContent,null,4)}]`);
    // eslint-disable-next-line prettier/prettier
    throw new Error('PESTO CONTENT REST CONTROLLER - PUT - I FORCE STOPPING UPDATE IN CONTROLLER')
    const associatedContentType: PestoContentType =
      await this.contentTypeService.findOne(
        `${updatePestoContent.content_type_id}`,
      );
    /*
    this.logger.verbose(
      ` PESTO CONTENT REST CONTROLLER - PUT - associatedContentType :`,
      JSON.stringify(associatedContentType, null, 4),
    );
    */
    /*
    this.logger.verbose(
      ` PESTO CONTENT REST CONTROLLER - PUT - [associatedContentType.project_id] :`,
      `${associatedContentType.project_id}`,
    );
    */
    /*
    this.logger.verbose(
      ` PESTO CONTENT REST CONTROLLER - PUT - [updatePestoContent.project_id] :`,
      `${updatePestoContent.project_id}`,
    );
    */
    if (
      `${associatedContentType.project_id}` !=
      `${updatePestoContent.project_id}`
    ) {
      throw new Error(
        `PESTO CONTENT REST CONTROLLER - PUT - Error checking the constraint that [project_id] of [updatePestoContent] and [associatedContentType] must be equal! so Pesto Content will NOT be updated`,
      );
    }
    return await this.service.update(id, updatePestoContent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PestoContentDeletionResponse> {
    this.logger.verbose(`Ouais ok c'est le DELETE [${id}]`);
    return await this.service.delete(id);
  }
}
