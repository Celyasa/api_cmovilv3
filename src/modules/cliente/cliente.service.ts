import { plainToInstance } from 'class-transformer';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getClienteAutoventaDto } from './dto/getClienteAutoventa.dto';
import { getVerificarClienteDto } from './dto/getVerificarCliente.dto';
// import * as XLSX from 'xlsx';
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

  async leerExcel() {
    try {
      // // const obtenerClientes = await this._clienteService.query(``);
      // const filePath =
      //   'C:\\Users\\analistaprogramador\\Downloads\\Desarrollo\\BackEnd\\api_cmovilv3\\src\\helpers\\base.xlsx';
      // // Leer el archivo Excel
      // const workbook = XLSX.readFile(filePath);
      // const sheetName = workbook.SheetNames[0]; // Asumiendo que quieres leer la primera hoja
      // const worksheet = workbook.Sheets[sheetName];

      // // Cabeceras específicas que queremos obtener
      // const specificHeaders = [
      //   'Area',
      //   'RUC',
      //   'Customer Desc',
      //   'Direccion',
      //   'Limite de Credito',
      //   'POLITICA',
      //   'Lista de Precios',
      //   'LISTA PRECIOS CELYASA',
      //   'Telefono',
      //   'MAIL',
      //   'NOMBRECOM',

      // ];
      // const headerIndexes = {};

      // // Obtener las cabeceras desde B5, C5, D5, etc.
      // let col = 'B';
      // while (worksheet[`${col}5`]) {
      //   const header = worksheet[`${col}5`].v;
      //   if (specificHeaders.includes(header)) {
      //     headerIndexes[header] = col;
      //   }
      //   col = String.fromCharCode(col.charCodeAt(0) + 1); // Incrementar la columna
      // }

      // console.log('Cabeceras:', headerIndexes);

      // // Leer los datos a partir de la fila 6
      // const data = [];
      // let row = 6;
      // while (worksheet[`B${row}`]) {
      //   const rowData = {};
      //   specificHeaders.forEach((header) => {
      //     const cellAddress = headerIndexes[header] + row;
      //     rowData[header] = worksheet[cellAddress]
      //       ? worksheet[cellAddress].v
      //       : undefined;
      //   });
      //   data.push(rowData);
      //   row++;
      // }

      // // Generar la consulta SQL INSERT ALL
      // let sqlQuery = 'INSERT ALL\n';
      // data.forEach((rowData) => {
      //   sqlQuery += `INTO carga_cli_temp (RUTA, RUC_CEDULA, NOMBRE, DIRECCION, CUPO, POLITICA, LISTAPRECIO, TELEFONO1, TELEFONO2, MAIL, NOMBRECOM, SEXO, ESTADO_CIVIL, CIUDAD, PARROQUIA, LATITUD, LONGITUD, SEGMENTO) VALUES ('${rowData['Area']}', '${rowData['Territory']}', '${rowData['STATUS']}', '${rowData['RUC']}', '${rowData['Direccion']}')\n`;
      // });
      // sqlQuery += 'SELECT * FROM dual;';

      // console.log('Consulta SQL:', sqlQuery);
      return { ok: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // SELECT cli_codigo
  // FROM cliente cli
  // WHERE cli.cli_empresa = 2
  // AND cli.cli_tipo in (1,5)
  // AND cli.cli_ruc_cedula like '0702223843%'

  async verificarCliente(cliRucCedula: string) {
    try {
      const obtenerClientes = await this._clienteService.query(
        `
        SELECT cli_codigo, r.rut_id ruta_1, r.rut_id ruta_2
        FROM cliente cli
        left join ruta r on r.rut_codigo = cli.cli_ruta and r.rut_empresa = cli.cli_empresa
        left join ruta p on p.rut_codigo = cli.cli_ruta_p2 and p.rut_empresa = cli.cli_empresa
        WHERE cli.cli_empresa = 2
        AND cli.cli_tipo in (1,5)
        AND cli.cli_ruc_cedula like '${cliRucCedula.slice(0, 10)}%'
     `,
      );
      if (obtenerClientes.length > 0) {
        return plainToInstance(getVerificarClienteDto, obtenerClientes);
      } else {
        throw new HttpException('No existe clientes', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
