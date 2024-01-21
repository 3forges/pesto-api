import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePestoContentTypeDto } from './dto/create-pesto-content-type.dto';
import { UpdatePestoContentTypeDto } from './dto/update-pesto-content-type.dto';
import {
  PestoContentTypeDocument,
  PestoContentType,
} from './schemas/PestoContentType.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';
import {
  PestoProject,
  PestoProjectDocument,
} from './../pesto-project/schemas/PestoProject.schema';

@Injectable()
export class PestoContentTypeService {
  constructor(
    @InjectModel(PestoContentType.name)
    private readonly model: Model<PestoContentTypeDocument>,
    @InjectModel(PestoProject.name)
    private readonly projectsModel: Model<PestoProjectDocument>,
  ) {}
  /*
  constructor(
    @InjectModel(PestoContentType.name)
    private readonly model: Model<PestoContentTypeDocument>,
  ) {} */
  async findAll(): Promise<PestoContentType[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<PestoContentType> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY ID] method - It is impossible to find any [PestoContentType] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.model.findById(id).exec();
  }

  async findOneByName(provided_name: string): Promise<PestoContentType> {
    if (provided_name == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY NAME] method - It is impossible to find any [PestoContentType] with an empty string as PROJECT NAME, the provided PROJECT NAME is the empty string: /pesto-content-type/name/:name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model.findOne({
      $or: [
        { name: provided_name },
        // { description: createPestoContentTypeDto.description },
      ],
    });

    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [GET PROJECT BY NAME] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return didIFindOne;
    }
  }
  async findAllByProjectID(
    provided_project_id: string,
  ): Promise<PestoContentType[]> {
    if (provided_project_id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PESTOCONTENTTYPE BY PROJECT ID] method - It is impossible to find any [PestoContentType] with an empty string as [Pesto Project ID], the provided PROJECT ID is the empty string: /pesto-content-type/project/:project_id = [${provided_project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const foundContentTypes = await this.model.find({
      $or: [
        { project_id: provided_project_id },
        // { description: createPestoContentTypeDto.description },
      ],
    });

    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [GET PESTOCONTENTTYPE BY PROJECT ID] method - Found record [foundContentTypes]:`,
      foundContentTypes,
    );
    if (!foundContentTypes) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PESTOCONTENTTYPE BY PROJECT ID] method - No [PestoContentType] was found in Database, with project_id = [${provided_project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return foundContentTypes;
    }
  }
  async create(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    const didIFindOne = await this.model.findOne({
      $and: [
        { name: createPestoContentTypeDto.name },
        { project_id: createPestoContentTypeDto.project_id },
      ],
    });
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - [${JSON.stringify(
        createPestoContentTypeDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - No new [PestoContentType] was created. A PestoContentType already exists with name = [${createPestoContentTypeDto.name}] and project_id = [${createPestoContentTypeDto.project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      const didIFindOneProject = await this.projectsModel.findOne({
        // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
        $or: [
          { _id: createPestoContentTypeDto.project_id },
          // { description: updatePestoProjectDto.description },
        ],
      });
      if (!didIFindOneProject) {
        const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - No new [PestoContentType] was created. You provided a [project_id] = [${createPestoContentTypeDto.project_id}] but no Pesto Project exist in the database with that ID! `;
        // throw `${errMsg}`;
        console.warn(`${errMsg}`);
        throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
      } else {
        console.log(
          `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - Creating the below Pesto Content Type :`,
          didIFindOne,
        );
        console.log(
          `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - Associated with the below Pesto Project :`,
          didIFindOneProject,
        );
        /**
         * In the case the pesto content type does
         * not already exist, AND the [project_id] exists
         * in the database, then only we create it:
         * No update is done through this method
         */
        // We do not generate a project_id, because it is geenrated either by Mongoose on MongoDB
        /*
        createPestoContentTypeDto.project_id = new mongoose.Types.ObjectId(
          createPestoContentTypeDto.project_id,
        );
        */
        // return await new this.model(createPestoContentTypeDto).save();
        return await new this.model({
          ...createPestoContentTypeDto,
          createdAt: new Date(),
        }).save();
      }
    }
  }

  async update(
    id: string,
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY ID] method - It is impossible to update any [PestoContentType] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.findOne(id);
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [before]-[UPDATE BY ID] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [before]-[UPDATE BY ID] method [updatePestoContentTypeDto] = - [${JSON.stringify(
        updatePestoContentTypeDto,
        null,
        4,
      )}]`,
    );

    if (didIFindOne) {
      /**
       * Then I update the database from the DTO:
       * An HTTP response status code 406 is returned
       * if the record does not exist in the database
       */
      /**/
      const toReturn = await this.model
        .findByIdAndUpdate(id, updatePestoContentTypeDto)
        .exec();
      console.info(
        `PESTO-CONTENT-TYPE DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by [Mongoose] 's [findByIdAndUpdate] : - [${JSON.stringify(
          toReturn,
          null,
          4,
        )}]`,
      );
      console.info(
        `PESTO-CONTENT-TYPE DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by Pesto API : - [${JSON.stringify(
          {
            _id: toReturn._id,
            name: updatePestoContentTypeDto.name,
            frontmatter_definition:
              updatePestoContentTypeDto.frontmatter_definition,
            project_id: updatePestoContentTypeDto.project_id,
            createdAt: updatePestoContentTypeDto.createdAt,
            description: updatePestoContentTypeDto.description,
          },
          null,
          4,
        )}]`,
      );
      return {
        _id: toReturn._id,
        name: updatePestoContentTypeDto.name,
        frontmatter_definition:
          updatePestoContentTypeDto.frontmatter_definition,
        project_id: updatePestoContentTypeDto.project_id,
        createdAt: updatePestoContentTypeDto.createdAt,
        description: updatePestoContentTypeDto.description,
      };
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContentType] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContentTypeDeletionResponse> {
    const didIFindOne = await this.model.findOne({
      $or: [
        { _id: id },
        // { description: updatePestoContentTypeDto.description },
      ],
    });
    if (!didIFindOne) {
      const errMsg = `DATA SERVICE [DELETE BY ID] - No [PestoContentType] with [_id] = [${id}]  was found in the database: Cannot delete non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return {
      deletedProject: await this.model.findByIdAndDelete(id).exec(),
      message: `Project successfully deleted`,
    };
  }
}
import { Field, /* ID,*/ ObjectType } from '@nestjs/graphql';
@ObjectType('PestoContentTypeDeletionResponse')
export class PestoContentTypeDeletionResponse {
  @Field({ nullable: true })
  deletedProject: PestoContentType;
  @Field({ nullable: true })
  message: string;
}
