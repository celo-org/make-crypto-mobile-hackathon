import { Test, TestingModule } from '@nestjs/testing';
import { CustumerController } from './custumer.controller';

describe('CustumerController', () => {
  let controller: CustumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustumerController],
    }).compile();

    controller = module.get<CustumerController>(CustumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
