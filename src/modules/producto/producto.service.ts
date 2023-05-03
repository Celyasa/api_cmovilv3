import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { plainToInstance } from 'class-transformer';
import { getProductoAutoventaDto } from './dto/getProductoAutoventa.dto';
import { postCPedidoInsertarDto } from './dto/postCPedidoInsertar.dto';
import { postDPedidoInsertarDto } from './dto/postDPedidoInsertar.dto';
import { log } from 'console';

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
        from sellerm2.v_movil_producto_recarga 
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

  async insertarPedidoCcomproba(cPedido: postCPedidoInsertarDto) {
    try {
      const insertProductos = await this._clienteService.query(
        `select TO_CHAR(AST_SELLERMOVIL_2.insertaCabPedRecarga(${cPedido.lqAut})) as codLQ from dual`,
      );
      if (insertProductos[0].CODLQ == -1) {
        throw new HttpException(
          'No se pudo registrar el Ccomproba',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return { codLQ: insertProductos[0].CODLQ };
      }
    } catch (error) {
      console.log('ERROR insertarPedidoCcomproba -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async insertarPedidoDFactura(dPedido: postDPedidoInsertarDto) {
    try {
      const insertarDPedido = await this._clienteService.query(
        `select AST_SELLERMOVIL_2.insertaDetPedRec(${dPedido.codLQ}, ${dPedido.proSecuencia}, ${dPedido.proCodigo}, ${dPedido.proCantidad}) as OK from dual `,
      );
      if (insertarDPedido[0].OK == -1) {
        throw new HttpException(
          'No se pudo registrar la dPedido',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return insertarDPedido[0];
      }
    } catch (error) {
      console.log('insertarPedidoDFactura -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
