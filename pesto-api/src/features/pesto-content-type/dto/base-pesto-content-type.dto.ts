import mongoose from 'mongoose';
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
  title: string;
  identifier: string;
  description?: string;
}
