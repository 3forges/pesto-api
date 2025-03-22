import { Test, TestingModule } from '@nestjs/testing';
import { PestoContentController } from './pesto-content.controller';

describe('PestoContentController', () => {
  let controller: PestoContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PestoContentController],
    }).compile();

    controller = module.get<PestoContentController>(PestoContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
