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
import { postCPedidoInsertarDto } from './dto/postCPedidoInsertar.dto';
import { postDPedidoInsertarDto } from './dto/postDPedidoInsertar.dto';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get('/autoventa/:ucmCodigo')
  async obtenerProductosAutoventa(@Param('ucmCodigo') ucmCodigo: number) {
    return await this.productoService.obtenerProductosParaAutoventa(ucmCodigo);
  }

  @Post('/cpedido')
  async insertarCPedido(
    @Body() _postPedidoInsertarDto: postCPedidoInsertarDto,
  ) {
    return await this.productoService.insertarPedidoCcomproba(
      _postPedidoInsertarDto,
    );
  }

  @Post('/dpedido')
  async insertarDPedido(
    @Body() _postDPedidoInsertarDto: postDPedidoInsertarDto,
  ) {
    return await this.productoService.insertarPedidoDFactura(
      _postDPedidoInsertarDto,
    );
  }
  @Get('/escribir/archivo')
  async obtenerClientesAutoventa() {
    return await this.productoService.leerArchivo();
  }
  @Get('/lista/archivo')
  async listaDataFile() {
    return await this.productoService.listaDataFile();
  }
  @Get('/delete/archivo')
  async deleteDataFIle() {
    return await this.productoService.deleteDataFile();
  }
}
