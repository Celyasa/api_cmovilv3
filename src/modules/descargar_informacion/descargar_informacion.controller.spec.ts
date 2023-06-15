import { Test, TestingModule } from '@nestjs/testing';
import { DescargarInformacionController } from './descargar_informacion.controller';
import { DescargarInformacionService } from './descargar_informacion.service';

describe('DescargarInformacionController', () => {
  let controller: DescargarInformacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescargarInformacionController],
      providers: [DescargarInformacionService],
    }).compile();

    controller = module.get<DescargarInformacionController>(DescargarInformacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
