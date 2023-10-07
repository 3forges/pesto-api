import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePestoContentTypeDto } from './dto/create-pesto-content-type.dto';
import { UpdatePestoContentTypeDto } from './dto/update-pesto-content-type.dto';
import {
  PestoContentTypeDocument,
  PestoContentType,
} from './schemas/PestoContentType.schema';

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

  async create(
    createPestoContentTypeDto: CreatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    return await new this.model({
      ...createPestoContentTypeDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updatePestoContentTypeDto: UpdatePestoContentTypeDto,
  ): Promise<PestoContentType> {
    return await this.model
      .findByIdAndUpdate(id, updatePestoContentTypeDto)
      .exec();
  }

  async delete(id: string): Promise<PestoContentType> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
