import { Test, TestingModule } from '@nestjs/testing';
import { PestoContentTypeController } from './pesto-content-type.controller';

describe('PestoContentTypeController', () => {
  let controller: PestoContentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PestoContentTypeController],
    }).compile();

    controller = module.get<PestoContentTypeController>(
      PestoContentTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
