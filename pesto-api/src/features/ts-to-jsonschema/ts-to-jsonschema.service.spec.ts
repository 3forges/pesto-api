import { Test, TestingModule } from '@nestjs/testing';
import { TsToJSonSchemaService } from './ts-to-jsonschema.service';

describe('TsToJSonSchemaService', () => {
  let service: TsToJSonSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsToJSonSchemaService],
    }).compile();

    service = module.get<TsToJSonSchemaService>(TsToJSonSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
