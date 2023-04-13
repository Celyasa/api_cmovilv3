import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { plainToInstance } from 'class-transformer';
import { getProductoAutoventaDto } from './dto/getProductoAutoventa.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly _clienteService: Repository<Producto>,
  ) {}

  async obtenerProductosParaAutoventa(ucmCodigo: number) {
    try {
      const obtenerProductos = await this._clienteService.query(
        `select distinct pro_codigo, pro_id, pro_nombre,pro_stock, 
        gpr_id, pro_peso
        from sellerm2.v_movil_producto 
        where ugp_usuario = ${ucmCodigo} 
        and pro_empresa = 2
        and pro_stock > 0
        order by pro_id `,
      );
      if (obtenerProductos.length > 0) {
        return plainToInstance(getProductoAutoventaDto, obtenerProductos);
        return obtenerProductos;
      } else {
        throw new HttpException('No existe productos', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
