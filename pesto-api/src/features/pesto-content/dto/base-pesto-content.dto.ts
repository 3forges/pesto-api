import mongoose from 'mongoose';
export class BasePestoContentDto {
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

  project_id: mongoose.Types.ObjectId;
  content_type_id: mongoose.Types.ObjectId;
  /**
   * Will be the markdown filename, or
   * the entry_name if you want
   */
  name: string;

  frontmatter: string;
  markdown_content?: string;
}
