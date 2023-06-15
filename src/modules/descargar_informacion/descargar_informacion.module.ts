import { Module } from '@nestjs/common';
import { DescargarInformacionService } from './descargar_informacion.service';
import { DescargarInformacionController } from './descargar_informacion.controller';

@Module({
  controllers: [DescargarInformacionController],
  providers: [DescargarInformacionService]
})
export class DescargarInformacionModule {}
