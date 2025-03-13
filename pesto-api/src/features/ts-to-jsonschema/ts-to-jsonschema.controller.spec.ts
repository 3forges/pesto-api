import { Test, TestingModule } from '@nestjs/testing';
import { TsToJSonSchemaController } from './ts-to-jsonschema.controller';

describe('TsToJSonSchemaController', () => {
  let controller: TsToJSonSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsToJSonSchemaController],
    }).compile();

    controller = module.get<TsToJSonSchemaController>(
      TsToJSonSchemaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
