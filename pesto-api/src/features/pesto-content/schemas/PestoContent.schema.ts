import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
/*
import {
  PestoProjectDocument,
  PestoProject,
} from './../../pesto-project/schemas/PestoProject.schema';
*/
export type PestoContentDocument = PestoContent & Document;

@Schema()
export class PestoContent {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  /**
   * Foreign key in relation with the {@PestoProject } Object primary key '_id'
   * following example pattern at https://gist.github.com/jmora2612/6f82c537eb957102e925a433ae9f9a4c#file-products-schema-ts-L19
   */
  // @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    auto: false,
  })
  project_id: mongoose.Types.ObjectId;

  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PestoContentSchema = SchemaFactory.createForClass(PestoContent);
