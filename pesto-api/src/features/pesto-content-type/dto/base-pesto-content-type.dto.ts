import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import FRONTMATTER_FORMAT from '../schemas/frontmatter.format';

export class BasePestoContentTypeDto {
  /**
   * _id can be defined as optional in DTO, because
   * The corresponding property in the
   * Schema is configured as 'auto'
   * (meaning it can be auto-generated if
   * not provided at the moment we execute
   * the mongoose Model 'save' method)
   * ---
   * @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
   */
  _id?: mongoose.Types.ObjectId;
  /**
   * project_id is the foreign key to the project it is related to
   */
  // project_id: string | mongoose.Types.ObjectId;
  project_id: string;

  @ApiProperty({
    enum: FRONTMATTER_FORMAT,
    enumName: `FRONTMATTER_FORMAT`,
    isArray: false,
    // example: [FRONTMATTER_FORMAT.JSON, FRONTMATTER_FORMAT.YAML],
    example: FRONTMATTER_FORMAT.YAML,
  })
  frontmatter_format?: FRONTMATTER_FORMAT;
  frontmatter_schema?: string;

  title: string;
  identifier: string;
  description?: string;
}
