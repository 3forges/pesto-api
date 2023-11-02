import { Test, TestingModule } from '@nestjs/testing';
import { PestoProjectController } from './pesto-project.controller';

describe('PestoProjectController', () => {
  let controller: PestoProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PestoProjectController],
    }).compile();

    controller = module.get<PestoProjectController>(PestoProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
