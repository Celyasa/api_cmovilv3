import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get('/autoventa/:ucmCodigo')
  async obtenerProductosAutoventa(@Param('ucmCodigo') ucmCodigo: number) {
    return await this.productoService.obtenerProductosParaAutoventa(ucmCodigo);
  }
}
