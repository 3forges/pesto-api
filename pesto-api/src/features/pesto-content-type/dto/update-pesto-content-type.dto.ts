import { BasePestoContentTypeDto } from './base-pesto-content-type.dto';

export class UpdatePestoContentTypeDto extends BasePestoContentTypeDto {
  completedAt: Date;
  createdAt: Date;
}
