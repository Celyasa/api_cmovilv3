import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DescargarInformacionService } from './descargar_informacion.service';

@Controller('descargar-informacion')
export class DescargarInformacionController {
  constructor(
    private readonly descargarInformacionService: DescargarInformacionService,
  ) {}
}
