import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import FRONTMATTER_FORMAT from './frontmatter.format';

/*
import {
  PestoProjectDocument,
  PestoProject,
} from './../../pesto-project/schemas/PestoProject.schema';
*/
export type PestoContentTypeDocument = PestoContentType & Document;

@Schema()
export class PestoContentType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
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

  /**
   * frontmatter schema of this content type:
   * - either a JSON Shcema, in JSON schema format.
   * - or a YAML Schema, in YAML format.
   * default value: '{}'
   */
  @Prop()
  frontmatter_schema?: string;
  /**
   * frontmatter format of this content type:
   * - either JSON format.
   * - or a YAML format.
   * default value: FRONTMATTER_FORMAT.JSON
   */
  @Prop()
  frontmatter_format?: FRONTMATTER_FORMAT;

  @Prop()
  description?: string;

  @Prop({ required: true })
  identifier: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}
/*
export const PestoContentTypeSchema =
  SchemaFactory.createForClass(PestoContentType);
PestoContentTypeSchema.index(
  { identifier: 1, project_id: 1 },
  { unique: true },
);
*/
/*
export const PestoContentTypeSchema = SchemaFactory.createForClass(
  PestoContentType,
).index({ identifier: 1, project_id: 1 }, { unique: true });
*/
export const PestoContentTypeSchema =
  SchemaFactory.createForClass(PestoContentType);
