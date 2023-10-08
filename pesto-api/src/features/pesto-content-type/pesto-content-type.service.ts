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
import FRONTMATTER_FORMAT from './schemas/frontmatter.format';

@Injectable()
export class PestoContentTypeService {
  constructor(
    @InjectModel(PestoContentType.name)
    private readonly model: Model<PestoContentTypeDocument>,
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
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY ID] method - It is impossible to find any [PestoContentType] with an empty string as ID, the provided ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.model.findById(id).exec();
  }

  async findByProject(project_id: string): Promise<PestoContentType[]> {
    if (project_id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY PROJECT ID] method - It is impossible to find any [PestoContentType] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/project/:id = [${project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model
      .find<PestoContentType>({
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
      `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY PROJECT ID] method - Tried to find [PestoContentType]'s with Project ID [${project_id}], here are the results of the Mongoose Query : `,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET PestoContentType BY PROJECT ID] method - Failed to find any [PestoContentType] with Project ID [${project_id}]`;
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
      return didIFindOne;
    }
  }
  applyDefaultValues(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ) /*: CreatePestoContentTypeDto*/ {
    if (!createPestoContentTypeDto.frontmatter_format) {
      createPestoContentTypeDto.frontmatter_format = FRONTMATTER_FORMAT.JSON;
    }

    if (!createPestoContentTypeDto.frontmatter_format) {
      createPestoContentTypeDto.frontmatter_format == FRONTMATTER_FORMAT.JSON;
    }

    if (!createPestoContentTypeDto.frontmatter_schema) {
      if (
        createPestoContentTypeDto.frontmatter_format == FRONTMATTER_FORMAT.JSON
      ) {
        createPestoContentTypeDto.frontmatter_schema = `{}`;
      } else if (
        createPestoContentTypeDto.frontmatter_format == FRONTMATTER_FORMAT.YAML
      ) {
        createPestoContentTypeDto.frontmatter_schema = ``;
      } else {
        const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] - [applyDefaultValues(createPestoContentTypeDto: CreatePestoContentTypeDto)] method - The frontmatter_format = [${createPestoContentTypeDto.frontmatter_format}] matches none of the {@FRONTMATTER_FORMAT} Enum values.`;
        // throw `${errMsg}`;
        console.warn(`${errMsg}`);
        throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
      }
    }
    // return createPestoContentTypeDto;
  }

  /**
   * Creates a new PestoContentType
   * @param createPestoContentTypeDto the dto sent by client request
   * @returns nothing...?
   */
  async create(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    this.applyDefaultValues(createPestoContentTypeDto);
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - After Applying default values to the DTO : `,
      createPestoContentTypeDto,
    );
    const didIFindOne = await this.model.findOne({
      // $or: [{ identifier: createPestoContentTypeDto.identifier }, { description: products.description }],
      $and: [
        { identifier: createPestoContentTypeDto.identifier },
        { project_id: createPestoContentTypeDto.project_id }, // two different projects can use same identifier
      ],
    });
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method createPestoContentTypeDto - [${JSON.stringify(
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
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - No new [PestoContentType] was created. A PestoContentType already exists with identifier = [${createPestoContentTypeDto.identifier}] and project_id = [${createPestoContentTypeDto.project_id}]`;
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
      createPestoContentTypeDto.project_id = new mongoose.Types.ObjectId(
        createPestoContentTypeDto.project_id,
      );
      */
      // return await new this.model(createPestoContentTypeDto).save();
      return await new this.model({
        ...createPestoContentTypeDto,
        project_id: createPestoContentTypeDto.project_id,
        createdAt: new Date(),
      }).save();
    }
  }

  async update(
    id: string,
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [UPDATE PestoContentType BY ID] method - It is impossible to update any [PestoContentType] with an empty string as ID, the provided ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.findOne(id);
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [UPDATE BY ID] method - [${JSON.stringify(
        updatePestoContentTypeDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [UPDATE BY ID] method - Found record [didIFindOne]:`,
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
        .findByIdAndUpdate(id, updatePestoContentTypeDto)
        .exec();
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContentType] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContentType> {
    if (id == ``) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [DELETE PestoContentType BY ID] method - It is impossible to delete any [PestoContentType] with an empty string as ID, the provided ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.model.findByIdAndDelete(id).exec();
  }
}
