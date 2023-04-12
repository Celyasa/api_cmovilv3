import { Test, TestingModule } from '@nestjs/testing';
import { UsrcmovilController } from './usrcmovil.controller';
import { UsrcmovilService } from './usrcmovil.service';

describe('UsrcmovilController', () => {
  let controller: UsrcmovilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsrcmovilController],
      providers: [UsrcmovilService],
    }).compile();

    controller = module.get<UsrcmovilController>(UsrcmovilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
