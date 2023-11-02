import { Test, TestingModule } from '@nestjs/testing';
import { PestoContentService } from './pesto-content.service';

describe('PestoContentService', () => {
  let service: PestoContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PestoContentService],
    }).compile();

    service = module.get<PestoContentService>(PestoContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
