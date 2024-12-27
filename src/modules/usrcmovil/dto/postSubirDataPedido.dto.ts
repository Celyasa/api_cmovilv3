import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class postSubirDataPedidoDto {
  // @ApiProperty()
  // @Expose()
  // @IsNotEmpty({ message: 'Falta cmovilVersion' })
  // @Type(() => CmovilVersion)
  // cmovilVersion: CmovilVersion[];
  // @ApiProperty()
  // @Expose()
  // lq: Lq[];
  // @ApiProperty()
  // @Expose()
  // cliente: Cliente[];
  @ApiProperty()
  @IsNumber()
  @Expose()
  pedId: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ccaEmpresa: number;

  @ApiProperty()
  @IsDate()
  @Expose()
  @Type(() => Date)
  pedFechaFin: Date;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ageCodigo: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedCliCodigo: number;

  @ApiProperty()
  @IsString()
  @Expose()
  pedLqCcoCodigo: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ccaRuta: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedCliPoliticas: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  cliListaPre: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  cliImpPorcentaje: number;

  @ApiProperty()
  @IsArray()
  @Expose()
  @Type(() => PedidoD)
  pedidoD: PedidoD[];

  @ApiProperty()
  @IsNumber()
  @Expose()
  subTotal: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  totDesc1: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  totDesc2: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  iva: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  total: number;
}

class PedidoD {
  @ApiProperty()
  @IsNumber()
  @Expose()
  pedDetId: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProCodigo: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProCantidad: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProPrecio: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProDescuento: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ccoBodega: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedTotal: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProDscItem: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedProCombo: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedGrabaIva: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedDlpUmedida: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedCantDigitada: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedPDigitado: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedDlpListaPre: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedCodPack: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedTipoPack: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  pedTipoProPack: number;

  @ApiProperty()
  @IsString()
  @Expose()
  pedGarantia: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ldrCodigo: number;
}

// class Cliente {
//   @ApiProperty()
//   @Expose()
//   CLI_CODIGO: number;

//   @ApiProperty()
//   @Expose()
//   CLI_ID: string;

//   @ApiProperty()
//   @Expose()
//   CLI_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   CLI_RUC_CEDULA: string;

//   @ApiProperty()
//   @Expose()
//   CLI_DIRECCION: string;

//   @ApiProperty()
//   @Expose()
//   CLI_TELEFONO1: string;

//   @ApiProperty()
//   @Expose()
//   CLI_TELEFONO2: string;

//   @ApiProperty()
//   @Expose()
//   CLI_TELEFONO3: string;

//   @ApiProperty()
//   @Expose()
//   CLI_MAIL: string;

//   @ApiProperty()
//   @Expose()
//   CLI_BLOQUEO: number;

//   @ApiProperty()
//   @Expose()
//   CLI_CUPO: number;

//   @ApiProperty()
//   @Expose()
//   CLI_ORDEN: null;

//   @ApiProperty()
//   @Expose()
//   CLI_NOMBRECOM: null;

//   @ApiProperty()
//   @Expose()
//   CLI_LATITUD: number;

//   @ApiProperty()
//   @Expose()
//   CLI_LONGITUD: number;

//   @ApiProperty()
//   @Expose()
//   CLI_SEGMENTACION: number;

//   @ApiProperty()
//   @Expose()
//   AGE_CODIGO: number;

//   @ApiProperty()
//   @Expose()
//   AGE_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   TCL_NOMBRE: null;

//   @ApiProperty()
//   @Expose()
//   CCL_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   LPR_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   CAT_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   POL_NOMBRE: string;

//   @ApiProperty()
//   @Expose()
//   CLI_LISTAPRE: number;

//   @ApiProperty()
//   @Expose()
//   PARROQUIA: string;

//   @ApiProperty()
//   @Expose()
//   CIUDAD: string;

//   @ApiProperty()
//   @Expose()
//   RUT_CODIGO: number;

//   @ApiProperty()
//   @Expose()
//   RUT_ID: string;

//   @ApiProperty()
//   @Expose()
//   SIS_IMPUESTO_VENTA: number;

//   @ApiProperty()
//   @Expose()
//   IMP_PORCENTAJE: number;

//   @ApiProperty()
//   @Expose()
//   CLI_SOLICITA_DATOS: number;
// }

// class CmovilVersion {
//   @ApiProperty()
//   @Expose()
//   @IsString()
//   @IsNotEmpty({ message: 'Falta UCM_NUEVAVERSION' })
//   UCM_NUEVAVERSION: string;
// }

// class Lq {
//   @ApiProperty()
//   @Expose()
//   RUT_ID: string;

//   @ApiProperty()
//   @Expose()
//   RUTA_FECHA: string;

//   @ApiProperty()
//   @Expose()
//   FECHA_LIQUIDACION: string;

//   @ApiProperty()
//   @Expose()
//   LIQUIDACION: string;

//   @ApiProperty()
//   @Expose()
//   LIQUIDACION_DATE: string;

//   @ApiProperty()
//   @Expose()
//   CCO_FECHA: Date;

//   @ApiProperty()
//   @Expose()
//   CCA_EMPRESA: number;

//   @ApiProperty()
//   @Expose()
//   CCA_RUTA: number;

//   @ApiProperty()
//   @Expose()
//   AGE_CODIGO_PRE: number;

//   @ApiProperty()
//   @Expose()
//   AGE_NOMBRE_PRE: string;

//   @ApiProperty()
//   @Expose()
//   CCO_BODEGA: number;

//   @ApiProperty()
//   @Expose()
//   CCO_SERIE: number;

//   @ApiProperty()
//   @Expose()
//   AGE_CODIGO_ENT: number;

//   @ApiProperty()
//   @Expose()
//   AGE_NOMBRE_ENT: string;

//   @ApiProperty()
//   @Expose()
//   USR_CODIGO: number;

//   @ApiProperty()
//   @Expose()
//   CCO_ADESTINO: number;

//   @ApiProperty()
//   @Expose()
//   CCO_ANIO: number;

//   @ApiProperty()
//   @Expose()
//   CCO_MES: number;

//   @ApiProperty()
//   @Expose()
//   CAD_ID: string;

//   @ApiProperty()
//   @Expose()
//   USR_ID: string;

//   @ApiProperty()
//   @Expose()
//   RUT_LIBRE: number;

//   @ApiProperty()
//   @Expose()
//   VALOR_CERCAGPS: string;
// }
