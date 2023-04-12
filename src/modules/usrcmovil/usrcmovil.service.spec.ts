import { Test, TestingModule } from '@nestjs/testing';
import { UsrcmovilService } from './usrcmovil.service';

describe('UsrcmovilService', () => {
  let service: UsrcmovilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsrcmovilService],
    }).compile();

    service = module.get<UsrcmovilService>(UsrcmovilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
