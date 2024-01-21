import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
/*
import {
  PestoContentTypeDocument,
  PestoContentType,
} from './../../pesto-content-type/schemas/PestoContentType.schema';
*/
export type PestoContentTypeDocument = PestoContentType & Document;

@ObjectType('PestoContentType')
@Schema()
export class PestoContentType {
  @Field(() => ID, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  /**
   * The foreign key to the pesto project
   * The API will check that this project ID exist
   */
  @Field(() => ID, { nullable: false })
  @Prop({
    required: true, // you can't create a content type without a pesto project.
    unique: false, // obviously several content types can be associated to the same project
    type: mongoose.Schema.Types.ObjectId, // this will be useful so that mongoose performsa format check, it must be a valid mongoose/mongoDB ID
    auto: false, // it is not auto generated, it will be an existing pesto project id
  })
  project_id: mongoose.Schema.Types.ObjectId;

  @Field({ nullable: true })
  @Prop({ required: true, unique: true })
  name: string;

  /**
   * For each content type, a frontmatter will be defined
   * -
   * This string must be a valid typescript interface
   * -
   * This string will be validated by the API, to 
   * check it is a valid TypeScript interface. Pesto
   * will use it to then generate a content type in
   * a hugo project, in an Astro project, etc... using
   *  "adapters". 
   * e.g. in an Astro project, pesto will generate a content collection definition using defineCollection, in the [src/content/config.ts] file
   */
  @Field({ nullable: true })
  @Prop({ required: true, unique: false })
  frontmatter_definition: string; 

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  createdAt: Date;

  @Field({ nullable: true })
  @Prop()
  deletedAt?: Date;
}

export const PestoContentTypeSchema =
  SchemaFactory.createForClass(PestoContentType);








// project_id: mongoose.Schema.Types.ObjectId;
// name: string;
// description?: string;
// createdAt: Date;
// deletedAt?: Date;
