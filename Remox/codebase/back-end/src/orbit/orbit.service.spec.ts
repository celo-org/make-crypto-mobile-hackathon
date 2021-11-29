import { Test, TestingModule } from '@nestjs/testing';
import { OrbitService } from './orbit.service';

describe('OrbitService', () => {
  let service: OrbitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrbitService],
    }).compile();

    service = module.get<OrbitService>(OrbitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
