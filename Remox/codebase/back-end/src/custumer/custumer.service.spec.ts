import { Test, TestingModule } from '@nestjs/testing';
import { CustumerService } from './custumer.service';

describe('CustumerService', () => {
  let service: CustumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustumerService],
    }).compile();

    service = module.get<CustumerService>(CustumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
