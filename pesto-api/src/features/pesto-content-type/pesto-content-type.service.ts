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
    if (id == ``) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PestoContentType BY ID] method - It is impossible to find any [PestoContentType] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    return await this.model.findById(id).exec();
  }

  async findOneByName(provided_name: string): Promise<PestoContentType> {
    if (provided_name == ``) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PestoContentType BY NAME] method - It is impossible to find any [PestoContentType] with an empty string as PROJECT NAME, the provided PROJECT NAME is the empty string: /pesto-content-type/name/:name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoContentTypeDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { name: provided_name },
        // { description: createPestoContentTypeDto.description },
      ],
    });

    console.log(
      `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return didIFindOne;
    }
  }
  async findOneByGitSshUri(
    provided_git_ssh_uri: string,
  ): Promise<PestoContentType> {
    if (provided_git_ssh_uri == ``) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PestoContentType BY GIT SSH URI] method - It is impossible to find any [PestoContentType] with an empty string as GIT SSH URI, the provided PROJECT NAME is the empty string: /pesto-content-type/uri/:git_ssh_uri = [${provided_git_ssh_uri}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoContentTypeDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { git_ssh_uri: provided_git_ssh_uri },
        // { description: createPestoContentTypeDto.description },
      ],
    });

    console.log(
      `PESTO-PROJECT DATA SERVICE [GET PROJECT BY GIT SSH URI] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY GIT SSH URI] method - No [PestoContentType] was found in Database, with git_ssh_uri = [${provided_git_ssh_uri}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoContentType] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return didIFindOne;
    }
  }
  async create(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoContentTypeDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { git_ssh_uri: createPestoContentTypeDto.git_ssh_uri },
        // { description: createPestoContentTypeDto.description },
      ],
    });
    console.log(
      `PESTO-PROJECT DATA SERVICE [CREATE] method - [${JSON.stringify(
        createPestoContentTypeDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-PROJECT DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [CREATE] method - No new [PestoContentType] was created. A PestoContentType already exists with git_ssh_uri = [${createPestoContentTypeDto.git_ssh_uri}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    } else {
      /**
       * In the case the pesto content type does
       * not already exist, then only we create it:
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

  async update(
    id: string,
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    if (id == ``) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PestoContentType BY ID] method - It is impossible to update any [PestoContentType] with an empty string as PROJECT ID, the provided PROJECT ID is the empty string: /pesto-content-type/:id = [${id}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.findOne(id);
    console.log(
      `PESTO-PROJECT DATA SERVICE [before]-[UPDATE BY ID] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    console.log(
      `PESTO-PROJECT DATA SERVICE [before]-[UPDATE BY ID] method [updatePestoContentTypeDto] = - [${JSON.stringify(
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
        `PESTO-PROJECT DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by [Mongoose] 's [findByIdAndUpdate] : - [${JSON.stringify(
          toReturn,
          null,
          4,
        )}]`,
      );
      console.info(
        `PESTO-PROJECT DATA SERVICE [AFTER SUCCESSFULLY]-[UPDATE BY ID] here is the Object returned by Pesto API : - [${JSON.stringify(
          {
            //_id: toReturn.id,
            _id: toReturn._id,
            //createdAt: toReturn.createdAt,
            createdAt: updatePestoContentTypeDto.createdAt,
            description: updatePestoContentTypeDto.description,
            //name: toReturn.name,
            name: updatePestoContentTypeDto.name,
            //git_ssh_uri: toReturn.git_ssh_uri,
            git_ssh_uri: updatePestoContentTypeDto.git_ssh_uri,
            //git_service_provider: toReturn.git_service_provider,
            git_service_provider:
              updatePestoContentTypeDto.git_service_provider,
          },
          null,
          4,
        )}]`,
      );
      return {
        //_id: toReturn.id,
        _id: toReturn._id,
        //createdAt: toReturn.createdAt,
        createdAt: updatePestoContentTypeDto.createdAt,
        description: updatePestoContentTypeDto.description,
        //name: toReturn.name,
        name: updatePestoContentTypeDto.name,
        //git_ssh_uri: toReturn.git_ssh_uri,
        git_ssh_uri: updatePestoContentTypeDto.git_ssh_uri,
        //git_service_provider: toReturn.git_service_provider,
        git_service_provider: updatePestoContentTypeDto.git_service_provider,
      };
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoContentType] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  /**
   * DO NOT USE THIS METHOD, THIS IS JUST AN EXPERIMENT, ONLY _ID SHOULD BE TAKEN AS PARAM FOR ANY CRUD OPS - because it acts as primary key PRIMARY KEY
   * Tries to update a unique PestoContentType from its git_ssh_uri
   * @param updatePestoContentTypeDto the DTO created from received from HTTP client request payload, to upadte the record in MongoDB
   * @returns a Promise<mongoose.UpdateWriteOpResult> Object (could not yet find a way to return a {@Promise<PestoContentType> } Object )
   */
  async updateByGitSshUri(
    provided_git_ssh_uri: string,
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<mongoose.UpdateWriteOpResult> {
    if (provided_git_ssh_uri == ``) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [UPDATE PestoContentType BY git_ssh_uri] method - It is impossible to update any [PestoContentType] with an empty string as GIT_SSH_URI, the provided GIT_SSH_URI is the empty string: /pesto-content-type/uri/:git_ssh_uri = [${provided_git_ssh_uri}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoContentTypeDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { git_ssh_uri: provided_git_ssh_uri },
        // { description: updatePestoContentTypeDto.description },
      ],
    });
    if (didIFindOne) {
      /**
       * Then I update the database from the DTO:
       * The question here is how do I update only one object, by a custom property (here by 'git_ssh_uri')
       */
      /**/
      return await this.model
        .updateOne(
          {
            $or: [{ git_ssh_uri: updatePestoContentTypeDto.git_ssh_uri }],
          },
          updatePestoContentTypeDto,
        )
        .exec();
      /*
      return await this.model
      .findByIdAndUpdate(updatePestoContentTypeDto.git_ssh_uri, updatePestoContentTypeDto)
      .exec();
      */
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY GIT_SSH_URI] - No [PestoContentType] with git_ssh_uri = [${provided_git_ssh_uri}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoContentTypeDeletionResponse> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoContentTypeDto.git_ssh_uri }, { description: products.description }],
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
