import { BasePestoContentTypeDto } from './base-pesto-content-type.dto';

// export class CreatePestoContentTypeDto extends BasePestoContentTypeDto {}

export class CreatePestoContentTypeDto extends BasePestoContentTypeDto {
  completedAt: Date;
  createdAt: Date;
}
