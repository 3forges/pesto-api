import { BasePestoContentDto } from './base-pesto-content.dto';

// export class CreatePestoContentDto extends BasePestoContentDto {}

export class CreatePestoContentDto extends BasePestoContentDto {
  completedAt: Date;
  createdAt: Date;
}
