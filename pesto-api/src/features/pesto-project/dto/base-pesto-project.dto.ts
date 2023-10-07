import mongoose from 'mongoose';
export class BasePestoProjectDto {
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
  // @Prop({ required: true, unique: true })
  name: string;

  // @Prop({ required: true, unique: true })
  git_ssh_uri: string;

  // @Prop()
  git_service_provider?: string;
  description?: string;
}
