import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { UsrcmovilService } from './usrcmovil.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { postSubirDataDto } from './dto/postSubirData.dto';
import { postParamDataMapDto } from './dto/postParamDataMap.dto';

// @UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Usrcmovil')
@ApiBearerAuth()
@Controller('usrcmovil')
export class UsrcmovilController {
  constructor(private readonly usrcmovilService: UsrcmovilService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/descargar/data')
  async descargarDatos(@Headers() headers) {
    return await this.usrcmovilService.descargarData(headers);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/subir/data')
  async subirDatos(@Body() _postSubirDataDto: postSubirDataDto) {
    return await this.usrcmovilService.subirData(_postSubirDataDto);
  }

  @Get('/obtener/agente/:almId/:ucmModulo')
  async obtenerAgentes(
    @Param('almId') almId: number,
    @Param('ucmModulo') ucmModulo: number,
  ) {
    return await this.usrcmovilService.obtenerAgentePorAlmId(almId, ucmModulo);
  }

  @Post('/grafica/maps')
  async obtenerDataGraficaMap(
    @Body() _postParamDataMapDto: postParamDataMapDto,
  ) {
    return await this.usrcmovilService.obtenerDatosParaGraficarEnMapaPreventa(
      _postParamDataMapDto,
    );
  }
}
