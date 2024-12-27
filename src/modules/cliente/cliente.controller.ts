import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cliente')
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

  // @Get('/excel/read')
  // async leerExcel() {
  //   return await this.clienteService.leerExcel();
  // }
}
