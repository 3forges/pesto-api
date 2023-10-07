import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePestoProjectDto } from './dto/create-pesto-project.dto';
import { UpdatePestoProjectDto } from './dto/update-pesto-project.dto';
import {
  PestoProjectDocument,
  PestoProject,
} from './schemas/PestoProject.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PestoProjectService {
  constructor(
    @InjectModel(PestoProject.name)
    private readonly model: Model<PestoProjectDocument>,
  ) {}
  /*
  constructor(
    @InjectModel(PestoProject.name)
    private readonly model: Model<PestoProjectDocument>,
  ) {} */
  async findAll(): Promise<PestoProject[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<PestoProject> {
    return await this.model.findById(id).exec();
  }

  async findOneByName(provided_name: string): Promise<PestoProject> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { name: provided_name },
        // { description: createPestoProjectDto.description },
      ],
    });

    console.log(
      `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (!didIFindOne) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoProject] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    } /*else if (didIFindOne.$isEmpty) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [GET PROJECT BY NAME] method - No [PestoProject] was found in Database, with name = [${provided_name}]`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_FOUND);
    }*/ else {
      return didIFindOne;
    }
  }

  async create(
    createPestoProjectDto: CreatePestoProjectDto,
  ): Promise<PestoProject> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { git_ssh_uri: createPestoProjectDto.git_ssh_uri },
        // { description: createPestoProjectDto.description },
      ],
    });
    console.log(
      `PESTO-PROJECT DATA SERVICE [CREATE] method - [${JSON.stringify(
        createPestoProjectDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-PROJECT DATA SERVICE [CREATE] method - Found record [didIFindOne]:`,
      didIFindOne,
    );
    if (didIFindOne) {
      const errMsg = `PESTO-PROJECT DATA SERVICE [CREATE] method - No new [PestoProject] was created. A PestoProject already exists with git_ssh_uri = [${createPestoProjectDto.git_ssh_uri}]`;
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
      createPestoProjectDto.project_id = new mongoose.Types.ObjectId(
        createPestoProjectDto.project_id,
      );
      */
      // return await new this.model(createPestoProjectDto).save();
      return await new this.model({
        ...createPestoProjectDto,
        createdAt: new Date(),
      }).save();
    }
  }

  async update(
    id: string,
    updatePestoProjectDto: UpdatePestoProjectDto,
  ): Promise<PestoProject> {
    const didIFindOne = await this.findOne(id);
    console.log(
      `PESTO-PROJECT DATA SERVICE [UPDATE BY ID] method - [${JSON.stringify(
        updatePestoProjectDto,
        null,
        4,
      )}]`,
    );
    console.log(
      `PESTO-PROJECT DATA SERVICE [UPDATE BY ID] method - Found record [didIFindOne]:`,
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
        .findByIdAndUpdate(id, updatePestoProjectDto)
        .exec();
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY ID] - No [PestoProject] with [_id] = [${id}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  /**
   * DO NOT USE THIS METHOD, THIS IS JUST AN EXPERIMENT, ONLY _ID SHOULD BE TAKEN AS PARAM FOR ANY CRUD OPS - because it acts as primary key PRIMARY KEY
   * Tries to update a unique PestoProject from its git_ssh_uri
   * @param updatePestoProjectDto the DTO created from received from HTTP client request payload, to upadte the record in MongoDB
   * @returns a Promise<mongoose.UpdateWriteOpResult> Object (could not yet find a way to return a {@Promise<PestoProject> } Object )
   */
  async updateByGitSshUri(
    updatePestoProjectDto: UpdatePestoProjectDto,
  ): Promise<mongoose.UpdateWriteOpResult> {
    const didIFindOne = await this.model.findOne({
      // $or: [{ git_ssh_uri: createPestoProjectDto.git_ssh_uri }, { description: products.description }],
      $or: [
        { git_ssh_uri: updatePestoProjectDto.git_ssh_uri },
        // { description: updatePestoProjectDto.description },
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
            $or: [{ git_ssh_uri: updatePestoProjectDto.git_ssh_uri }],
          },
          updatePestoProjectDto,
        )
        .exec();
      /*
      return await this.model
      .findByIdAndUpdate(updatePestoProjectDto.git_ssh_uri, updatePestoProjectDto)
      .exec();
      */
    } else {
      const errMsg = `DATA SERVICE [UPDATE BY GIT_SSH_URI] - No [PestoProject] with git_ssh_uri = [${updatePestoProjectDto.git_ssh_uri}]  was found in the database: Cannot update non-existing record !`;
      // throw `${errMsg}`;
      console.warn(`${errMsg}`);
      throw new HttpException(`${errMsg}`, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string): Promise<PestoProject> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
