import { plainToInstance } from 'class-transformer';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getClienteAutoventaDto } from './dto/getClienteAutoventa.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly _clienteService: Repository<Cliente>,
  ) {}

  async obtenerClientesAutoventa(cliRuta: number) {
    try {
      const obtenerClientes = await this._clienteService.query(
        `select c.cli_codigo, c.cli_nombre, c.cli_ruta, c.cli_imp_venta, c.cli_direccion, c.cli_telefono1, c.cli_cupo, 
        c.cli_ilimitado, c.ccl_nombre, c.cli_listapre, c.cli_zona, c.cli_orden, c.cli_latitud, c.cli_longitud, 
        c.cli_blancogris, c.cli_politicas, c.cli_porcimp_venta, c.cli_ruc_cedula, c.cli_ciudad, c.cli_impuestos, 
        cli_id, cli_nombrecom, parroquia, cli_ref_direccion, cli_mail, pol_nombre, cat_nombre, lpr_nombre, 
        tcl_nombre, age_nombre, nvl(ent_cob,0) ent_cob, cli_bloqueo, valor_minfac, valor_minfacre, cli_segmentacion 
        from sellerm2.v_movil_cliente_autoventa c 
        where c.cli_ruta = ${cliRuta}`,
      );
      if (obtenerClientes.length > 0) {
        return plainToInstance(getClienteAutoventaDto, obtenerClientes);
      } else {
        throw new HttpException('No existe clientes', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
