import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
/*
import {
  PestoProjectDocument,
  PestoProject,
} from './../../pesto-project/schemas/PestoProject.schema';
*/
export type PestoProjectDocument = PestoProject & Document;

@ObjectType('PestoProject')
@Schema()
export class PestoProject {
  @Field(() => ID)
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  git_ssh_uri: string;

  @Field()
  @Prop()
  git_service_provider?: string;

  @Field()
  @Prop()
  description?: string;

  @Field()
  @Prop()
  completedAt?: Date;

  @Field()
  @Prop({ required: true })
  createdAt: Date;

  @Field()
  @Prop()
  deletedAt?: Date;
}

export const PestoProjectSchema = SchemaFactory.createForClass(PestoProject);
