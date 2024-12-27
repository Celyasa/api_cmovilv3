import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { postCPedidoInsertarDto } from './dto/postCPedidoInsertar.dto';
import { postDPedidoInsertarDto } from './dto/postDPedidoInsertar.dto';
import { postSubirDataRecargaDto } from './dto/postSubirDataRecarga.dto';

@UsePipes(ValidationPipe)
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

  @Post('/subir/recarga')
  @ApiResponse({ status: 200, type: postSubirDataRecargaDto })
  async subirRecarga(
    @Body() _postSubirDataRecargaDto: postSubirDataRecargaDto[],
  ) {
    return await this.productoService.subirRecargasCmovil(
      _postSubirDataRecargaDto,
    );
  }
}
