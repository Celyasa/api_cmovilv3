import { Test, TestingModule } from '@nestjs/testing';
import { DescargarInformacionService } from './descargar_informacion.service';

describe('DescargarInformacionService', () => {
  let service: DescargarInformacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescargarInformacionService],
    }).compile();

    service = module.get<DescargarInformacionService>(DescargarInformacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
