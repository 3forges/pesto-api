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

  @Field({ nullable: true })
  @Prop({ required: true, unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop({ required: true, unique: true })
  git_ssh_uri: string;

  @Field({ nullable: true })
  @Prop()
  git_service_provider?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop()
  completedAt?: Date;

  @Field({ nullable: true })
  @Prop({ required: true })
  createdAt: Date;

  @Field({ nullable: true })
  @Prop()
  deletedAt?: Date;
}

export const PestoContentTypeSchema =
  SchemaFactory.createForClass(PestoContentType);
