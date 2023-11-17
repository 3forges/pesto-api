import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
/*
import {
  PestoProjectDocument,
  PestoProject,
} from './../../pesto-project/schemas/PestoProject.schema';
*/
export type PestoContentDocument = PestoContent & Document;

@ObjectType('PestoContent')
@Schema()
export class PestoContent {
  //@Field()
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Field()
  // @Prop({ required: true, unique: true })
  @Prop({ required: true })
  name: string;

  /**
   * Foreign key in relation with the {@PestoProject } Object primary key '_id'
   * following example pattern at https://gist.github.com/jmora2612/6f82c537eb957102e925a433ae9f9a4c#file-products-schema-ts-L19
   */
  // @Prop({ type: mongoose.Types.ObjectId, required: true, index: true })
  /**
   * Relation to the [PestoProject] this
   * [PestoContent] belongs to.
   */
  @Field(() => ID)
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    auto: false,
  })
  project_id: mongoose.Types.ObjectId;
  /**
   * Relation to a [PestoContentType]
   */
  @Field(() => ID)
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
    auto: false,
  })
  content_type_id: mongoose.Types.ObjectId;
  @Field()
  @Prop({ required: true })
  text: string;

  @Field()
  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Field()
  @Prop({ required: true })
  createdAt: Date;

  @Field()
  @Prop()
  deletedAt?: Date;
}

export const PestoContentSchema = SchemaFactory.createForClass(PestoContent);
