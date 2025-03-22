import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { PestoProject } from 'src/features/pesto-project/schemas/PestoProject.schema';
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
   * About defining a foreign key with mongoose, why
   * use [mongoose.Types.ObjectId],
   * not [mongoose.Schema.Types.ObjectId] :
   * cf. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12385#issuecomment-1124903485
   */
  @Field(() => ID, { nullable: false })
  @Prop({
    // ref: 'Ingredient',
    ref: 'PestoProject',
    required: true, // you can't create a content type without a pesto project.
    unique: false, // obviously several content types can be associated to the same project
    type: mongoose.Types.ObjectId, // this will be useful so that mongoose performsa format check, it must be a valid mongoose/mongoDB ID
    auto: false, // it is not auto generated, it will be an existing pesto project id
  })
  project_id: mongoose.Types.ObjectId; // mongoose.Schema.Types.ObjectId;

  @Field({ nullable: true })
  @Prop({ required: true, unique: false })
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
   * e.g. in an Astro project, pesto will generate a
   * content collection definition using
   * [defineCollection()] hook from [astro:content], in
   *  the [src/content/config.ts] file.
   *
   * Pesto will then turn the typescript
   * interface, into a zod definition.
   *
   * something like :
   *
   * const <name of Content Type> =  = defineCollection({
   *  schema: ({ image }) =>
   *    z.object({
   *      title: z.string(),
   *      description: z.string(),
   *      coverSVG: image(),
   *      socialImage: image(),
   *      // seoKeywords: z.array(z.string()).optional(),
   *      seoKeywords: z.array(z.string()),
   *      creationDate: z.date().optional().default(SiteMetadata.buildTime),
   *    })
   * })
   *
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
