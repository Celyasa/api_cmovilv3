import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
}
