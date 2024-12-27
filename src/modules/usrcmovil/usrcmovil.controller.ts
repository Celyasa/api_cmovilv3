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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsrcmovilService } from './usrcmovil.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { postParamDataMapDto } from './dto/postParamDataMap.dto';
import { postSubirDataNovedadDto } from './dto/postSubirDataNovedad.dto';
import { postSubirDataPedidoDto } from './dto/postSubirDataPedido.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

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
  async subirDatos(@Body() _postSubirDataDto: [postSubirDataPedidoDto]) {
    return await this.usrcmovilService.subirData(_postSubirDataDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/subir/novedad')
  @UseInterceptors(FileInterceptor('file'))
  async subirDatosNovedad(
    @Body() _postSubirDataNovedadDto: [postSubirDataNovedadDto],
    @UploadedFile() file: [Express.Multer.File],
  ) {
    return await this.usrcmovilService.subirDataNovedad(
      _postSubirDataNovedadDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/subir/imagen')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = './uploads/images'; // Ruta de destino
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true }); // Crear carpeta si no existe
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname); // Usar el nombre original del archivo
        },
      }),
    }),
  )
  async subirImagen(@UploadedFile() file: Express.Multer.File) {
    return await this.usrcmovilService.subirImagenServer(file);
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
