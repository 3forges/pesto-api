import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PestoContentTypeDocument = PestoContentType & Document;

@Schema()
export class PestoContentType {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  identifier: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const PestoContentTypeSchema =
  SchemaFactory.createForClass(PestoContentType);
