import { Injectable } from '@nestjs/common';
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
/**
 * From PestoContentType
 */
// import { CreatePestoContentTypeDto } from './../pesto-content-type/dto/create-pesto-content-type.dto';
// import { UpdatePestoContentTypeDto } from './../pesto-content-type/dto/update-pesto-content-type.dto';

import {
  PestoContentType,
  PestoContentTypeDocument,
} from '../pesto-content-type/schemas/PestoContentType.schema';
import {
  PestoProject,
  PestoProjectDocument,
} from '../pesto-project/schemas/PestoProject.schema';

@Injectable()
export class PestoContentService {
  constructor(
    @InjectModel(PestoContent.name)
    private readonly model: Model<PestoContentDocument>,
    @InjectModel(PestoContentType.name)
    private readonly typesModel: Model<PestoContentTypeDocument>,
    @InjectModel(PestoProject.name)
    private readonly projectsModel: Model<PestoProjectDocument>,
  ) {}
  /*
  constructor(
    @InjectModel(PestoContent.name)
    private readonly model: Model<PestoContentDocument>,
  ) {} */
  async findAll(): Promise<PestoContent[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<PestoContent> {
    return await this.model.findById(id).exec();
  }

  async findByProject(project_id: string): Promise<PestoContent[]> {
    if (project_id == ``) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PestoContent BY PROJECT ID] method - It is impossible to find any [PestoContent] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content/project/:id = [${project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindSome = await this.model
      .find<PestoContent>({
        // $or: [{ identifier: createPestoContentTypeDto.identifier }, { description: products.description }],
        $or: [
          { project_id: project_id },
          // { description: createPestoContentTypeDto.description },
        ],
      })
      .exec()
      .then((selectedList) => {
        /**
         * @description
         */
        return selectedList;
      });
    console.log(
      `PESTO-CONTENT DATA SERVICE [GET PestoContentType BY PROJECT ID] method - Tried to find [PestoContentType]'s with Project ID [${project_id}], here are the results of the Mongoose Query : `,
      didIFindSome,
    );
    if (!didIFindSome) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [GET PestoContentType BY PROJECT ID] method - Failed to find any [PestoContentType] with Project ID [${project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      /**
       * In the case the pesto content type does
       * not already exist, then only we create it:
       * No update is done through this method
       */
      // const toReturn: Promise<PestoContentType> = didIFindOne;
      // return toReturn;
      return didIFindSome;
    }
  }

  /**
   * Creates a new PestoContent
   * @param createPestoContentDto the dto sent by client request
   * @returns nothing...?
   */
  async create(
    createPestoContentDto: CreatePestoContentDto,
  ): Promise<PestoContent> {
    const didIFindOne = await this.model
      .findOne({
        // $or: [{ name: createPestoContentDto.name }, { description: products.description }],
        $and: [
          { name: createPestoContentDto.name },
          { project_id: createPestoContentDto.project_id },
          { content_type_id: createPestoContentDto.content_type_id },
          // { description: createPestoContentDto.description },
        ],
      })
      .exec();
    /**
     * we need here to use the
     */

    const didIFindOneType = await this.typesModel
      .findOne({
        // $or: [{ name: createPestoContentDto.name }, { description: products.description }],
        $and: [
          { _id: createPestoContentDto.content_type_id },
          // { description: createPestoContentDto.description },
        ],
      })
      .exec();

    console.log(
      `PESTO-CONTENT DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOneType,
    );
    const numberOfPestoCTs = await didIFindOneType.collection.countDocuments();
    if (!(didIFindOneType && numberOfPestoCTs > 0)) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created: No PestoContentType of with content_type_id = [${createPestoContentDto.content_type_id}] was found. A PestoContent cannot be created without an existing content-type.`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOnePrj = await this.projectsModel
      .findOne({
        // $or: [{ name: createPestoContentDto.name }, { description: products.description }],
        $and: [
          { _id: createPestoContentDto.project_id },
          // { description: createPestoContentDto.description },
        ],
      })
      .exec();
    console.log(
      `PESTO-CONTENT DATA SERVICE [CREATE] method - Found record [didIFindOnePrj]:`,
      didIFindOnePrj,
    );
    const numberOfPestoPrjs = await didIFindOnePrj.collection.countDocuments();
    if (!(didIFindOnePrj && numberOfPestoPrjs > 0)) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created: No [PestoProject] of project_id = [${createPestoContentDto.project_id}] was found. A PestoContent cannot be created without an existing [PestoProject].`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    console.log(
      `PESTO-CONTENT DATA SERVICE [CREATE] method - [${JSON.stringify(
        createPestoContentDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-CONTENT DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );

    if (didIFindOne) {
      const errMsg = `PESTO-CONTENT DATA SERVICE [CREATE] method - No new [PestoContent] was created. A PestoContent named [${didIFindOne.name}] already exists with name = [${createPestoContentDto.name}], and with project_id = [${createPestoContentDto.project_id}] `;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      /**
       * In the case the pesto content type does
       * not already exist, then only we create it:
       * No update is done through this method
       */
      // We do not generate a project_id, becasue it is required to be provided by the request
      /*
      createPestoContentDto.project_id = new mongoose.Types.ObjectId(
        createPestoContentDto.project_id,
      );
      */
      // return await new this.model(createPestoContentDto).save();
      return await new this.model({
        ...createPestoContentDto,
        project_id: createPestoContentDto.project_id,
        createdAt: new Date(),
      }).save();
    }
  }

  async update(
    id: string,
    updatePestoContentDto: UpdatePestoContentDto,
  ): Promise<PestoContent> {
    const didIFindOne = await this.findOne(id);
    console.log(
      `PESTO-CONTENT DATA SERVICE [UPDATE BY ID] method - [${JSON.stringify(
        updatePestoContentDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-CONTENT DATA SERVICE [UPDATE BY ID] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      /**
       * Then I update the database from the DTO:
       * An HTTP response status code 406 is returned
       * if the record does not exist in the database
       */
      /**/
      return await this.model
        .findByIdAndUpdate(id, updatePestoContentDto)
        .exec();
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContent] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContent> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
