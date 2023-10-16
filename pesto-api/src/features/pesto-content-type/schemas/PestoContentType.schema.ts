import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import FRONTMATTER_FORMAT from './frontmatter.format';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    description: `The schema of the frontmatter, specified with an example (stringified) JSON, will be converted to a JSON Schema by the [quicktypes] framework`,
    type: typeof String,
    isArray: false,
    // example: [FRONTMATTER_FORMAT.JSON, FRONTMATTER_FORMAT.YAML],
    example: `{ "prix" 45, devise: "eur", tailles_dispos: [{ "xs": "Extra-small", "s": "small", "M": "medium", "L": "Large", "XL": "Extra-Large", "XXL": "Extra-Extra-Large"  }] }`,
  })
  /**
   * frontmatter schema of this content type:
   * - either a JSON Shcema, in JSON schema format.
   * - or a YAML Schema, in YAML format.
   * default value: '{}'
   */
  @Prop()
  frontmatter_schema?: string;

  @ApiProperty({
    description: `The format of the frontmatter, either JSON, or YAML, for the PestoContentType`,
    enum: FRONTMATTER_FORMAT,
    enumName: `FRONTMATTER_FORMAT`,
    isArray: false,
    // example: [FRONTMATTER_FORMAT.JSON, FRONTMATTER_FORMAT.YAML],
    example: FRONTMATTER_FORMAT.YAML,
  })
  /**
   * frontmatter format of this content type:
   * - either JSON format.
   * - or a YAML format.
   * default value: FRONTMATTER_FORMAT.JSON
   */
  @Prop()
  frontmatter_format?: FRONTMATTER_FORMAT;

  @ApiProperty({
    description: `The description of this PestoContentType`,
    type: typeof String,
    isArray: false,
    // example: [FRONTMATTER_FORMAT.JSON, FRONTMATTER_FORMAT.YAML],
    example: `This Content Type represents a pair of shoe, with its size, its color, its price, the trademark, the model.`,
  })
  @Prop()
  description?: string;

  @ApiProperty({
    description: `The <code>identifier</code> to use as value of 'type: <identifier>' in the frontmatter of a markdown`,
    type: typeof String,
    isArray: false,
    // example: [FRONTMATTER_FORMAT.JSON, FRONTMATTER_FORMAT.YAML],
    example: `trousers`,
  })
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
