import { Test, TestingModule } from '@nestjs/testing';
import { PestoProjectService } from './pesto-project.service';

describe('PestoProjectService', () => {
  let service: PestoProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PestoProjectService],
    }).compile();

    service = module.get<PestoProjectService>(PestoProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
