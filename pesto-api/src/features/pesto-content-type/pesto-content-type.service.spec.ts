import { Test, TestingModule } from '@nestjs/testing';
import { PestoContentTypeService } from './pesto-content-type.service';

describe('PestoContentTypeService', () => {
  let service: PestoContentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PestoContentTypeService],
    }).compile();

    service = module.get<PestoContentTypeService>(PestoContentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
