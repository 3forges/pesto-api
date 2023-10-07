import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePestoContentTypeDto } from './dto/create-pesto-content-type.dto';
import { UpdatePestoContentTypeDto } from './dto/update-pesto-content-type.dto';
import {
  PestoContentTypeDocument,
  PestoContentType,
} from './schemas/PestoContentType.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

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
    return await this.model.findById(id).exec();
  }
  async findByProject(project_id: string): Promise<PestoContentType> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ identifier: createPestoContentTypeDto.identifier }, { description: products.description }],
      $or: [
        { project_id: project_id },
        // { description: createPestoContentTypeDto.description },
      ],
    });
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [GET BY PROJECT ID] method - Tried to find [PestoContentType]'s with Project ID [${project_id}], here are the results of the Mongoose Query : `,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET BY PROJECT ID] method - Failed to find any [PestoContentType] with Project ID [${project_id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      /**
       * In the case the pesto content type does
       * not already exist, then only we create it:
       * No update is done through this method
       */
      return didIFindOne;
    }
  }
  async create(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ identifier: createPestoContentTypeDto.identifier }, { description: products.description }],
      $or: [
        { identifier: createPestoContentTypeDto.identifier },
        // { description: createPestoContentTypeDto.description },
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
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - No new [PestoContentType] was created. A PestoContentType already exists with identifier = [${createPestoContentTypeDto.identifier}] or description = [${createPestoContentTypeDto.description}]`;
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

  /**
   * DO NOT USE THIS METHOD, THIS IS JUST AN EXPERIMENT, ONLY _ID SHOULD BE TAKEN AS PARAM FOR ANY CRUD OPS - because it acts as primary key PRIMARY KEY
   * Tries to update a unique PestoContentType from its identifier
   * @param updatePestoContentTypeDto the DTO created from received from HTTP client request payload, to upadte the record in MongoDB
   * @returns a Promise<mongoose.UpdateWriteOpResult> Object (could not yet find a way to return a {@Promise<PestoContentType> } Object )
   */
  async updateByIdentifier(
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<mongoose.UpdateWriteOpResult> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ identifier: createPestoContentTypeDto.identifier }, { description: products.description }],
      $or: [
        { identifier: updatePestoContentTypeDto.identifier },
        // { description: updatePestoContentTypeDto.description },
      ],
    });
    if (didIFindOne) {
      /**
       * Then I update the database from the DTO:
       * The question here is how do I update only one object, by a custom property (here by 'identifier')
       */
      /**/
      return await this.model
        .updateOne(
          {
            $or: [{ identifier: updatePestoContentTypeDto.identifier }],
          },
          updatePestoContentTypeDto,
        )
        .exec();
      /*
      return await this.model
      .findByIdAndUpdate(updatePestoContentTypeDto.identifier, updatePestoContentTypeDto)
      .exec();
      */
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY IDENTIFIER] - No [PestoContentType] with identifier = [${updatePestoContentTypeDto.identifier}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContentType> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
