import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { posCrearClienteDto } from './dto/posCrearCliente.dto';
@UsePipes(ValidationPipe)
@ApiTags('Cliente')
@ApiBearerAuth()
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @Get('/autoventa/:cliRuta')
  async obtenerClientesAutoventa(@Param('cliRuta') cliRuta: number) {
    return await this.clienteService.obtenerClientesAutoventa(cliRuta);
  }

  @Get('verificar')
  async verificarCliente(@Query('cliRucCedula') cliRucCedula: string) {
    return this.clienteService.verificarCliente(cliRucCedula);
  }

  @Post('inserta')
  async insertarCliente(@Body() _posCrearClienteDto: [posCrearClienteDto]) {
    return this.clienteService.crearCliente(_posCrearClienteDto);
  }

  // @Get('/excel/read')
  // async leerExcel() {
  //   return await this.clienteService.leerExcel();
  // }
}
