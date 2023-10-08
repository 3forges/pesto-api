import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePestoContentDto } from './dto/create-pesto-content.dto';
import { UpdatePestoContentDto } from './dto/update-pesto-content.dto';
import {
  PestoContentDocument,
  PestoContent,
} from './schemas/PestoContent.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PestoContentService {
  constructor(
    @InjectModel(PestoContent.name)
    private readonly model: Model<PestoContentDocument>,
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
  async findByProject(project_id: string): Promise<PestoContent> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ title: createPestoContentDto.title }, { description: products.description }],
      $or: [
        { project_id: project_id },
        // { description: createPestoContentDto.description },
      ],
    });
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [GET BY PROJECT ID] method - Tried to find [PestoContent]'s with Project ID [${project_id}], here are the results of the Mongoose Query : `,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [GET BY PROJECT ID] method - Failed to find any [PestoContent] with Project ID [${project_id}]`;
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
    createPestoContentDto: CreatePestoContentDto,
  ): Promise<PestoContent> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ title: createPestoContentDto.title }, { description: products.description }],
      $or: [
        { title: createPestoContentDto.title },
        // { description: createPestoContentDto.description },
      ],
    });
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - [${JSON.stringify(
        createPestoContentDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      const errMsg = `PESTO-CONTENT-TYPE DATA SERVICE [CREATE] method - No new [PestoContent] was created. A PestoContent already exists with title = [${createPestoContentDto.title}], and title is a unique property of [PestoContent]s `;
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
      `PESTO-CONTENT-TYPE DATA SERVICE [UPDATE BY ID] method - [${JSON.stringify(
        updatePestoContentDto,
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
        .findByIdAndUpdate(id, updatePestoContentDto)
        .exec();
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContent] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  /**
   * DO NOT USE THIS METHOD, THIS IS JUST AN EXPERIMENT, ONLY _ID SHOULD BE TAKEN AS PARAM FOR ANY CRUD OPS - because it acts as primary key PRIMARY KEY
   * Tries to update a unique PestoContent from its title
   * @param updatePestoContentDto the DTO created from received from HTTP client request payload, to upadte the record in MongoDB
   * @returns a Promise<mongoose.UpdateWriteOpResult> Object (could not yet find a way to return a {@Promise<PestoContent> } Object )
   */
  async updateByIdentifier(
    updatePestoContentDto: UpdatePestoContentDto,
  ): Promise<mongoose.UpdateWriteOpResult> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ title: createPestoContentDto.title }, { description: products.description }],
      $or: [
        { title: updatePestoContentDto.title },
        // { description: updatePestoContentDto.description },
      ],
    });
    if (didIFindOne) {
      /**
       * Then I update the database from the DTO:
       * The question here is how do I update only one object, by a custom property (here by 'title')
       */
      /**/
      return await this.model
        .updateOne(
          {
            $or: [{ title: updatePestoContentDto.title }],
          },
          updatePestoContentDto,
        )
        .exec();
      /*
      return await this.model
      .findByIdAndUpdate(updatePestoContentDto.title, updatePestoContentDto)
      .exec();
      */
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY IDENTIFIER] - No [PestoContent] with title = [${updatePestoContentDto.title}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContent> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
