import { BasePestoProjectDto } from './base-pesto-project.dto';

export class UpdatePestoProjectDto extends BasePestoProjectDto {
  completedAt: Date;
}
