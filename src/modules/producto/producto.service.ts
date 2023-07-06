import { postSubirDataDto } from './../usrcmovil/dto/postSubirData.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { plainToInstance } from 'class-transformer';
import { getProductoAutoventaDto } from './dto/getProductoAutoventa.dto';
import { postCPedidoInsertarDto } from './dto/postCPedidoInsertar.dto';
import { postDPedidoInsertarDto } from './dto/postDPedidoInsertar.dto';
import * as fs from 'fs';
import { postSubirDataRecargaDto } from './dto/postSubirDataRecarga.dto';

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
        and (pro_stock > 0 OR pro_combo =1)
        order by pro_id `,
      );
      if (obtenerProductos.length > 0) {
        return plainToInstance(getProductoAutoventaDto, obtenerProductos);
      } else {
        throw new HttpException('No existe productos', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async insertarPedidoCcomproba(cPedido: postCPedidoInsertarDto) {
    try {
      const nummero = 69;
      let num1 = Math.floor(Math.random() * 2000);
      let num2 = Math.floor(Math.random() * 1000);
      let num3 = Math.floor(Math.random() * 500);
      let num4 = Math.floor(Math.random() * 100);
      let respuesta =
        nummero + String(num1) + String(num2) + String(num3) + String(num4);
      let data = `"idIdentificador":"${respuesta}","lqAut":"${cPedido.lqAut}"`;
      // let sql = `idIdentificador:${respuesta}:select TO_CHAR(AST_SELLERMOVIL_2.insertaCabPedRecarga(${cPedido.lqAut})) as codLQ from dual`;
      this.escribirArchivo(data);
      return {
        codLQ: respuesta,
      };

      // const insertProductos = await this._clienteService.query(
      //   `select TO_CHAR(AST_SELLERMOVIL_2.insertaCabPedRecarga(${cPedido.lqAut})) as codLQ from dual`,
      // );
      // if (insertProductos[0].CODLQ == -1) {
      //   throw new HttpException(
      //     'No se pudo registrar el Ccomproba',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // } else {
      //   return { codLQ: insertProductos[0].CODLQ };
      // }
    } catch (error) {
      console.log('ERROR insertarPedidoCcomproba -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async insertarPedidoDFactura(dPedido: postDPedidoInsertarDto) {
    try {
      // let sql = `select AST_SELLERMOVIL_2.insertaDetPedRec(${dPedido.codLQ}, ${dPedido.proSecuencia}, ${dPedido.proCodigo}, ${dPedido.proCantidad}) as OK from dual`;
      let sql = `"codLQ":"${dPedido.codLQ}","proSecuencia":${dPedido.proSecuencia},"proCodigo":${dPedido.proCodigo},"proCantidad":${dPedido.proCantidad}`;
      this.escribirArchivo(sql);
      return {
        OK: 1,
      };
      // const insertarDPedido = await this._clienteService.query(
      //   `select AST_SELLERMOVIL_2.insertaDetPedRec(${dPedido.codLQ}, ${dPedido.proSecuencia}, ${dPedido.proCodigo}, ${dPedido.proCantidad}) as OK from dual `,
      // );
      // if (insertarDPedido[0].OK == -1) {
      //   throw new HttpException(
      //     'No se pudo registrar la dPedido',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // } else {
      //   return insertarDPedido[0];
      // }
    } catch (error) {
      console.log('insertarPedidoDFactura -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async escribirArchivo(entrada: String) {
    try {
      let text = fs.appendFileSync('my_ttexto.txt', entrada + '\n');
      // let lectura = fs.readFileSync('my_ttexto.txt', 'utf-8');
      // const wordList = lectura.split('\r\n');
      // console.log(wordList);

      return { ok: 'OK' };
    } catch (error) {
      console.log('escribirArchivo -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async leerArchivo() {
    try {
      let listaData = [];
      let lectura = fs.readFileSync('my_ttexto.txt', 'utf-8');
      let data = lectura.split('\n');
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.length > 0) {
          var json = JSON.parse('{' + element + '}');
          // console.log('------> ', json.idIdentificador);
          const identificador = listaData.find(
            (element) =>
              element.idIdentificador == json.idIdentificador &&
              element.lqAut == json.lqAut,
          );
          const proCodigo = listaData.find(
            (element) =>
              element.codLQ == json.codLQ &&
              element.proCodigo == json.proCodigo,
          );
          if (!identificador || !proCodigo) {
            listaData.push(json);
          }
        }
      }
      var comp = '';
      let codLq = undefined;
      let dPed = undefined;

      for (let index = 0; index < listaData.length; index++) {
        const element = listaData[index];
        if (element.idIdentificador > 0 && element.lqAut > 0) {
          comp = element.idIdentificador;
          //llamar a insertar cInsertar
          codLq = await this.insertarPedidoCcomprobaAux(element.lqAut);
        }
        if (comp == element.codLQ) {
          console.log(codLq.codLQ);
          if (codLq.codLQ != null && codLq.codLQ > 0) {
            //Llamar a dinsertar´
            dPed = await this.insertarPedidoDFacturaAux(
              codLq.codLQ,
              element.proSecuencia,
              element.proCodigo,
              element.proCantidad,
            );
          }
        }
      }

      if (listaData.length > 1) {
        this.deleteDataFile();
        return dPed;
      } else {
        throw new HttpException(
          'No existe datos para insertar',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log('leerArchivo -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async insertarPedidoCcomprobaAux(lqAut: string) {
    try {
      const insertProductos = await this._clienteService.query(
        `select TO_CHAR(AST_SELLERMOVIL_2.insertaCabPedRecarga(${lqAut})) as codLQ from dual`,
      );
      if (insertProductos[0].CODLQ == -1) {
        throw new HttpException(
          'No se pudo registrar el Ccomproba',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return { codLQ: insertProductos[0].CODLQ };
      }
      // let num1 = Math.floor(Math.random() * 2000);
      // let num2 = Math.floor(Math.random() * 1000);
      // let num3 = Math.floor(Math.random() * 500);
      // let num4 = Math.floor(Math.random() * 100);
      // let respuesta = String(num1) + String(num2) + String(num3) + String(num4);
      // return { codLQ: respuesta };
    } catch (error) {
      console.log('ERROR insertarPedidoCcomprobaAux --> ' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async insertarPedidoDFacturaAux(
    codLQ: string,
    proSecuencia: number,
    proCodigo: number,
    proCantidad: number,
  ) {
    try {
      // let sql = `select AST_SELLERMOVIL_2.insertaDetPedRec(${codLQ}, ${proSecuencia}, ${proCodigo}, ${proCantidad}) as OK from dual`;
      // console.log(sql);
      // return {
      //   OK: 1,
      // };

      const insertarDPedido = await this._clienteService.query(
        `select AST_SELLERMOVIL_2.insertaDetPedRec(${codLQ}, ${proSecuencia}, ${proCodigo}, ${proCantidad}) as OK from dual `,
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
      console.log('insertarPedidoDFacturaAux -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async listaDataFile() {
    try {
      // let text = fs.appendFileSync('my_ttexto.txt', entrada + '\n');
      let listaData = [];
      let lectura = fs.readFileSync('my_ttexto.txt', 'utf-8');
      let data = lectura.split('\n');
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.length > 0) {
          var json = JSON.parse('{' + element + '}');
          listaData.push(json);
        }
      }
      return listaData;
    } catch (error) {
      console.log('error listaDataFile -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteDataFile() {
    try {
      let eleiminar = fs.unlinkSync('my_ttexto.txt');
      this.escribirArchivo('');
      return { ok: 'OK' };
    } catch (error) {
      console.log('error en deleteDataFile -->' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async subirRecargasCmovil(
    postSubirDataRecargaDto: postSubirDataRecargaDto[],
  ) {
    try {
      let listaDetalle = [];
      for (let index = 0; index < postSubirDataRecargaDto.length; index++) {
        const element = postSubirDataRecargaDto[index];
        let data = `"idIdentificador":"${element.pedId}","lqAut":"${element.lqAut}"`;
        if (element.detalle.length > 0) {
          this.escribirArchivo(data);
          for (let index = 0; index < element.detalle.length; index++) {
            const detalle = element.detalle[index];
            let sql = `"codLQ":"${detalle.pedId}","proSecuencia":${detalle.secuencia},"proCodigo":${detalle.proCodigo},"proCantidad":${detalle.proCantidad}`;
            this.escribirArchivo(sql);
          }
          listaDetalle.push(element.pedId);
        } else {
          this.deleteDataFile();
          throw new HttpException(
            { ok: false, msg: 'No existe Detalle' },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      return { ok: true, listaDetalle: listaDetalle };
    } catch (error) {
      console.log('error en subirRecargasCmovil -->  ' + error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
