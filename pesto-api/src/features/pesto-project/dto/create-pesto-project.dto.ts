import { BasePestoProjectDto } from './base-pesto-project.dto';

// export class CreatePestoProjectDto extends BasePestoProjectDto {}

export class CreatePestoProjectDto extends BasePestoProjectDto {
  completedAt: Date;
  createdAt: Date;
}
