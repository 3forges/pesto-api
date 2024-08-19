import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePestoContentDto } from './dto/create-pesto-content.dto';
import { UpdatePestoContentDto } from './dto/update-pesto-content.dto';
import {
  PestoContentDocument,
  PestoContent,
} from './schemas/PestoContent.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';
import {
  PestoProject,
  PestoProjectDocument,
} from '../pesto-project/schemas/PestoProject.schema';
import { Field, /* ID,*/ ObjectType } from '@nestjs/graphql';
import {
  PestoContentType,
  PestoContentTypeDocument,
} from '../pesto-content-type/schemas/PestoContentType.schema';
import * as fs from 'fs';
@Injectable()
export class PestoContentService {
  private readonly logger = new Logger(PestoContentService.name);
  constructor(
    @InjectModel(PestoContent.name)
    private readonly model: Model<PestoContentDocument>,
    @InjectModel(PestoProject.name)
    private readonly projectsModel: Model<PestoProjectDocument>,
    @InjectModel(PestoContentType.name)
    private readonly contentTypesModel: Model<PestoContentTypeDocument>,
  ) {}
  /*
  constructor(
    @InjectModel(PestoContent.name)
    private readonly model: Model<PestoContentDocument>,
  ) {} */
  async findAll(): Promise<PestoContent[]> {
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`[PestoContent service] - [findAll()]`)
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<PestoContent> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PestoContent BY ID] method - It is impossible to find any [PestoContent] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.model.findById(id).exec();
  }

  async findOneByName(provided_name: string): Promise<PestoContent> {
    if (provided_name == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PestoContent BY NAME] method - It is impossible to find any [PestoContent] with an empty string as PROJECT NAME, the provided PROJECT NAME is the empty string: /pesto-content-type/name/:name = [${provided_name}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model.findOne({
      $or: [
        { name: provided_name },
        // { description: createPestoContentDto.description },
      ],
    });

    this.logger.verbose(
      `PESTO-CONTENT DATA SERVICE [GET PROJECT BY NAME] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContent] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContent] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return didIFindOne;
    }
  }
  /**
   * returns all content which have a given [project_id] equal to {@provided_project_id }
   * @param provided_project_id Id of the project for which you want to find contents
   * @returns Array of all the content which have a given [project_id] equal to {@provided_project_id }
   */
  async findAllByProjectID(
    provided_project_id: string,
  ): Promise<PestoContent[]> {
    if (provided_project_id == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY PROJECT ID] method - It is impossible to find any [PestoContent] with an empty string as [Pesto Project ID], the provided PROJECT ID is the empty string: /pesto-content-type/project/:project_id = [${provided_project_id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const foundContentTypes = await this.model.find({
      $or: [
        { project_id: provided_project_id },
        // { description: createPestoContentDto.description },
      ],
    });

    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY PROJECT ID] method - Found record [foundContentTypes]: [${JSON.stringify(foundContentTypes, null, 4)}]`);
    if (!foundContentTypes) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY PROJECT ID] method - No [PestoContent] was found in Database, with project_id = [${provided_project_id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } else {
      return foundContentTypes;
    }
  }
  /**
   * returns all content which have a given [project_id] equal to {@provided_project_id }
   * @param provided_project_id Id of the project for which you want to find contents
   * @returns Array of all the content which have a given [project_id] equal to {@provided_project_id }
   */
  async findAllByContentTypeID(
    provided_content_type_id: string,
  ): Promise<PestoContent[]> {
    if (provided_content_type_id == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY PROJECT ID] method - It is impossible to find any [PestoContent] with an empty string as [Pesto Content Type ID], the provided PROJECT ID is the empty string: /pesto-content/content-type/:provided_content_type_id = [${provided_content_type_id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const foundContents = await this.model.find({
      $or: [
        { content_type_id: provided_content_type_id },
        // { description: createPestoContentDto.description },
      ],
    });

    this.logger.verbose(
      `PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY CONTENT-TYPE ID] method - Found record [foundContents]:`,
      foundContents,
    );
    if (!foundContents) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PESTO-CONTENT BY CONTENT-TYPE ID] method - No [PestoContent] was found in Database, with content_type_id = [${provided_content_type_id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } else {
      return foundContents;
    }
  }

  async create(
    createPestoContentDto: CreatePestoContentDto,
  ): Promise<PestoContent> {
    const didIFindOne = await this.model.findOne({
      $and: [
        { name: createPestoContentDto.name },
        { project_id: createPestoContentDto.project_id },
      ],
    });
    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`PESTO-CONTENT DATA SERVICE [CREATE] method - [${JSON.stringify(createPestoContentDto,null,4)}]`);
    this.logger.verbose(
      `PESTO-CONTENT DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created. A PestoContent already exists with name = [${createPestoContentDto.name}] and project_id = [${createPestoContentDto.project_id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      const didIFindOneProject = await this.projectsModel
        .findOne({
          // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
          $or: [
            { _id: createPestoContentDto.project_id },
            // { description: updatePestoProjectDto.description },
          ],
        })
        .exec();
      if (!didIFindOneProject) {
        const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created. You provided a [project_id] = [${createPestoContentDto.project_id}] but no Pesto Project exist in the database with that ID! `;
        // throw `${errMsg}`;
        this.logger.verbose(`${errMsg}`);
        throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
      } else {
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [CREATE] method - Creating the below Pesto Content Type :`,
          didIFindOne,
        );
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [CREATE] method - Associated with the below Pesto Project :`,
          didIFindOneProject,
        );

        /**
         * Checking now constraint on associated content_type : a content type with ID mmust exist there
         */
        const didIFindOneContentType = await this.contentTypesModel.findOne({
          // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
          $or: [
            { _id: createPestoContentDto.content_type_id },
            // { description: updatePestoProjectDto.description },
          ],
        });
        if (!didIFindOneContentType) {
          const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created. You provided a [content_type_id] = [${createPestoContentDto.content_type_id}] but no Pesto Content Type exists in the database with that ID! `;
          // throw `${errMsg}`;
          this.logger.verbose(`${errMsg}`);
          throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
        } else {
          this.logger.verbose(
            `PESTO-CONTENT DATA SERVICE [CREATE] method - Creating the below Pesto Content Type :`,
            didIFindOne,
          );
          this.logger.verbose(
            `PESTO-CONTENT DATA SERVICE [CREATE] method - Associated with the below Pesto Project :`,
            didIFindOneProject,
          );
        }
        /**
         * In the case the pesto content type does
         * not already exist, AND the [project_id] exists
         * in the database, then only we create it:
         * No update is done through this method
         */
        // We do not generate a project_id, because it is geenrated either by Mongoose on MongoDB
        /*
        createPestoContentDto.project_id = new mongoose.Types.ObjectId(
          createPestoContentDto.project_id,
        );
        */
        // return await new this.model(createPestoContentDto).save();
        return await new this.model({
          ...createPestoContentDto,
          createdAt: new Date(),
        }).save();
      }
    }
  }

  async update(
    id: string,
    updatePestoContentDto: UpdatePestoContentDto,
  ): Promise<PestoContent> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [UPADATE PestoContent BY ID] method - It is impossible to update any [PestoContent] with an empty string as CONTENT ID, the provided CONTENT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.findOne(id);
    this.logger.verbose(
      `PESTO-CONTENT DATA SERVICE [before]-[UPDATE BY ID] method - Found record [didIFindOne]:`,
      didIFindOne,
    );

    // eslint-disable-next-line prettier/prettier
    this.logger.verbose(`PESTO-CONTENT DATA SERVICE [before]-[UPDATE BY ID] method [updatePestoContentDto] = - [${JSON.stringify(updatePestoContentDto,null,4)}]`);

    if (didIFindOne) {
      const didIFindOneProject = await this.projectsModel.findOne({
        // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
        $or: [
          { _id: updatePestoContentDto.project_id },
          // { description: updatePestoProjectDto.description },
        ],
      });
      const didIFindOneContentType = await this.contentTypesModel.findOne({
        // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
        $or: [
          { _id: updatePestoContentDto.content_type_id },
          // { description: updatePestoProjectDto.description },
        ],
      });
      if (!didIFindOneProject) {
        const errMsg = `PESTO-CONTENT DATA SERVICE [UPDATE] method - The [PestoContent] was not updated. You are trying to update a Pesto Content in a project which does not exist anymore! The Pesto Content Type you provided has [project_id] = [${updatePestoContentDto.project_id}] but no Pesto Project exist in the database with that ID! `;
        // throw `${errMsg}`;
        this.logger.verbose(`${errMsg}`);
        throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
      } else if (!didIFindOneContentType) {
        const errMsg = `PESTO-CONTENT DATA SERVICE [UPDATE] method - The [PestoContent] was not updated. You are trying to update a Pesto Content asociated to a Content Type which does not exist anymore: [content_type_id] = [${updatePestoContentDto.content_type_id}] but no Pesto Content Type exists in the database with that ID! `;
        // throw `${errMsg}`;
        this.logger.verbose(`${errMsg}`);
        throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
      } else {
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [UPDATE] method - Updating the below Pesto Content :`,
          didIFindOne,
        );
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [UPDATE] method - Updating the Pesto Content for the below Pesto Project :`,
          didIFindOneProject,
        );
        /**
         * In the case the pesto content type does
         * not already exist, AND the [project_id] exists
         * in the database, then only we create it:
         * No update is done through this method
         */
        // We do not generate a Pesto Content Type ID, because it is geenrated either by Mongoose on MongoDB
        /**
         * Then I update the database from the DTO:
         * An HTTP response status code 406 is returned
         * if the record does not exist in the database
         */
        /**/
        const toReturn = await this.model
          .findByIdAndUpdate(id, updatePestoContentDto)
          .exec();
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by [Mongoose] 's [findByIdAndUpdate] : - [${JSON.stringify(
            toReturn,
            null,
            4,
          )}]`,
        );
        this.logger.verbose(
          `PESTO-CONTENT DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by Pesto API : - [${JSON.stringify(
            {
              _id: toReturn._id,
              name: toReturn.name,
              frontmatter: toReturn.frontmatter,
              project_id: toReturn.project_id,
              content_type_id: toReturn.content_type_id,
              createdAt: toReturn.createdAt,
              markdown_content: toReturn.markdown_content,
            },
            null,
            4,
          )}]`,
        );
        return toReturn;
      }
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContent] with [_id] = [${id}]  was found in the database: Cannot update non-existing Pesto COntent record !`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContentDeletionResponse> {
    const didIFindOne = await this.model.findOne({
      $or: [
        { _id: id },
        // { description: updatePestoContentDto.description },
      ],
    });
    if (!didIFindOne) {
      const errMsg = `DATA SERVICE [DELETE BY ID] - No [PestoContent] with [_id] = [${id}]  was found in the database: Cannot delete non-existing record !`;
      // throw `${errMsg}`;
      this.logger.verbose(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return {
      deletedContentType: await this.model.findByIdAndDelete(id).exec(),
      message: `Content successfully deleted`,
    };
  }
  /**
   * Tests methods
   */
  async doSomething(callerMessage: string): Promise<void> {
    const tesMsg = `APP SERVICE [doSomething] - I am an asynchrone service method defined in the app service, and called by [${callerMessage}] !`;
    // throw `${errMsg}`;
    this.logger.verbose(`${tesMsg}`);
    // eslint-disable-next-line prettier/prettier
    // throw new Error('APP SERVICE [doSomething] - I am an error thrown in the data service method')
    await fs.writeFile(
      `file_${callerMessage}.txt`,
      `APP SERVICE [doSomething] - I am an asynchrone service method defined in the app service, and called by [${callerMessage}] !`,
      function (err) {
        if (err) {
          return this.logger.error(err);
        }
        this.logger.verbose('APP SERVICE [doSomething] - File created!');
      }.bind(this),
    );
  }
  doSomethingSync(callerMessage: string): void {
    const tesMsg = `APP SERVICE [doSomethingSync] - I am a synchrone service method in the app service, and called by [${callerMessage}] !`;
    // throw `${errMsg}`;
    this.logger.verbose(`${tesMsg}`);
    // eslint-disable-next-line prettier/prettier
    // throw new Error('APP SERVICE [doSomething] - I am an error thrown in the data service method')
  }
}

@ObjectType('PestoContentDeletionResponse')
export class PestoContentDeletionResponse {
  @Field({ nullable: true })
  deletedContentType: PestoContent;
  @Field({ nullable: true })
  message: string;
}
