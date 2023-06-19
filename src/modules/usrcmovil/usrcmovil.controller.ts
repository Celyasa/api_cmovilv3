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

@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
@ApiTags('Usrcmovil')
@ApiBearerAuth()
@Controller('usrcmovil')
export class UsrcmovilController {
  constructor(private readonly usrcmovilService: UsrcmovilService) {}

  @Get('/descargar/data')
  async descargarDatos(@Headers() headers) {
    return await this.usrcmovilService.descargarData(headers);
  }

  @Post('/subir/data')
  async subirDatos(@Body() _postSubirDataDto: postSubirDataDto) {
    return await this.usrcmovilService.subirData(_postSubirDataDto);
  }
}
