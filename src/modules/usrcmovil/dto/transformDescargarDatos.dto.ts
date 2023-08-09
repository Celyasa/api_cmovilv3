import { Expose, Type } from 'class-transformer';

export interface DescargarData {}

export class transformDescargarDatosDto {
  @Expose({ name: 'cmovilVersion' })
  @Type(() => String)
  cmovilVersion: string;

  @Type(() => Lq)
  lq: Lq[];

  @Type(() => Cliente)
  cliente: Cliente[];

  @Type(() => ListaPrecio)
  listaPrecio: ListaPrecio[];

  @Type(() => ProductoCategoria)
  productoCategoria: ProductoCategoria[];

  @Type(() => Producto)
  producto: Producto[];

  @Type(() => ProductoCombo)
  productoCombo: ProductoCombo[];

  @Type(() => ListaDescuento)
  listaDescuento: ListaDescuento[];

  @Type(() => TipoVisita)
  tipoVisita: TipoVisita[];

  @Type(() => ListaNegraTelefono)
  listaNegraTelefono: ListaNegraTelefono[];

  @Type(() => Presupuesto)
  presupuesto: Presupuesto[];

  @Type(() => PedidoSugerido)
  pedidoSugerido: PedidoSugerido[];

  @Type(() => AutualizacionDatosCliente)
  autualizacionDatosCliente: AutualizacionDatosCliente[];

  @Type(() => DatosCreaCliente)
  datosCreaCliente: DatosCreaCliente[];

  @Type(() => InfoCreaCliente)
  infoCreaCliente: InfoCreaCliente[];

  @Type(() => ComboMix)
  comboMix: ComboMix[];
}

class Lq {
  @Expose({ name: 'UCM_MODULO' })
  @Type(() => Number)
  ucmModulo: number;

  @Expose({ name: 'RUT_ID' })
  @Type(() => String)
  rutId: string;

  @Expose({ name: 'FECHA_LIQUIDACION' })
  @Type(() => String)
  fechaLiquidacion: string;

  @Expose({ name: 'LIQUIDACION' })
  @Type(() => String)
  liquidacion: string;

  @Expose({ name: 'LIQUIDACION_DATE' })
  @Type(() => String)
  liquidacionDate: string;

  @Expose({ name: 'CCO_FECHA' })
  @Type(() => Date)
  ccoFecha: Date;

  @Expose({ name: 'CCO_FECHAFIN' })
  @Type(() => Date)
  ccoFechaFin: Date;

  @Expose({ name: 'CCO_CODIGO' })
  @Type(() => String)
  ccoCodigo: string;

  @Expose({ name: 'CCA_EMPRESA' })
  @Type(() => Number)
  ccaEmpresa: number;

  @Expose({ name: 'CCA_RUTA' })
  @Type(() => Number)
  ccaRuta: number;

  @Expose({ name: 'AGE_CODIGO' })
  @Type(() => Number)
  ageCodigo: number;

  @Expose({ name: 'AGE_NOMBRE' })
  @Type(() => String)
  ageNombre: string;

  @Expose({ name: 'CCO_BODEGA' })
  @Type(() => Number)
  ccoBodega: number;

  @Expose({ name: 'CCO_SERIE' })
  @Type(() => Number)
  ccoSerie: number;

  @Expose({ name: 'AGE_CODIGO_ENT' })
  @Type(() => Number)
  ageCodigoEnt: number;

  @Expose({ name: 'AGE_NOMBRE_ENT' })
  @Type(() => String)
  ageNombreEnt: string;

  @Expose({ name: 'CCO_NIVEL_APROB' })
  @Type(() => Number)
  ccoNivelAprob: number;
}

class Cliente {
  @Expose({ name: 'CLI_EMPRESA' })
  @Type(() => Number)
  cliEmpresa: number;

  @Expose({ name: 'CLI_CODIGO' })
  @Type(() => Number)
  cliCodigo: number;

  @Expose({ name: 'CLI_ID' })
  @Type(() => String)
  cliId: string;

  @Expose({ name: 'CLI_NOMBRE' })
  @Type(() => String)
  cliNombre: string;

  @Expose({ name: 'CLI_RUC_CEDULA' })
  @Type(() => String)
  cliRucCedula: string;

  @Expose({ name: 'CLI_DIRECCION' })
  @Type(() => String)
  cliDireccion: string;

  @Expose({ name: 'CLI_TELEFONO1' })
  @Type(() => String)
  cliTelefono1: string;

  @Expose({ name: 'CLI_TELEFONO2' })
  @Type(() => String)
  cliTelefono2: null | string;

  @Expose({ name: 'CLI_TELEFONO3' })
  @Type(() => String)
  cliTelefono3: null | string;

  @Expose({ name: 'CLI_MAIL' })
  @Type(() => String)
  cliMail: null | string;

  @Expose({ name: 'CLI_BLOQUEO' })
  @Type(() => Number)
  cliBloqueo: number | null;

  @Expose({ name: 'CLI_CUPO' })
  @Type(() => Number)
  cliCupo: number;

  @Expose({ name: 'CLI_ORDEN' })
  @Type(() => Number)
  cliOrden: number | null;

  @Expose({ name: 'CLI_NOMBRECOM' })
  @Type(() => String)
  cliNombreCom: null | string;

  @Expose({ name: 'CLI_LATITUD' })
  @Type(() => Number)
  cliLatitud: number;

  @Expose({ name: 'CLI_LONGITUD' })
  @Type(() => Number)
  cliLongitud: number;

  @Expose({ name: 'CLI_SEGMENTACION' })
  @Type(() => Number)
  cliSegmentacion: number | null;

  @Expose({ name: 'CLI_AGENTE' })
  @Type(() => Number)
  cliAgente: number;

  @Expose({ name: 'TCL_NOMBRE' })
  @Type(() => String)
  tclNombre: string;

  @Expose({ name: 'CCL_NOMBRE' })
  @Type(() => String)
  cclNombre: string;

  @Expose({ name: 'CAT_NOMBRE' })
  @Type(() => String)
  catNombre: string;

  @Expose({ name: 'POL_NOMBRE' })
  @Type(() => String)
  polNombre: string;

  @Expose({ name: 'CLI_LISTAPRE' })
  @Type(() => Number)
  cliListaPre: number;

  @Expose({ name: 'PARROQUIA' })
  @Type(() => String)
  parroquia: string;

  @Expose({ name: 'CIUDAD' })
  @Type(() => String)
  ciudad: string;

  @Expose({ name: 'CLI_RUTA' })
  @Type(() => Number)
  cliRuta: number;

  @Expose({ name: 'SIS_IMPUESTO_VENTA' })
  @Type(() => Number)
  sisImpuestoVenta: number;

  @Expose({ name: 'IMP_PORCENTAJE' })
  @Type(() => Number)
  impPorcentaje: number;

  @Expose({ name: 'CLI_SOLICITA_DATOS' })
  @Type(() => Number)
  cliSolicitaDatos: number | null;
}

class ListaPrecio {
  @Expose({ name: 'DLP_CODIGO' })
  @Type(() => Number)
  dlpCodigo: number;

  @Expose({ name: 'DLP_LISTAPRE' })
  @Type(() => Number)
  dlpListPre: number;

  @Expose({ name: 'DLP_PRODUCTO' })
  @Type(() => Number)
  dlpProducto: number;

  @Expose({ name: 'DLP_UMEDIDA' })
  @Type(() => Number)
  dlpUMedida: number;

  @Expose({ name: 'UMD_ID' })
  @Type(() => String)
  umdId: string;

  @Expose({ name: 'DLP_EMPRESA' })
  @Type(() => Number)
  dlpEmpresa: number;

  @Expose({ name: 'DLP_ALMACEN' })
  @Type(() => Number)
  dlpAlmacen: number | null;

  @Expose({ name: 'DLP_CATPRODUCTO' })
  @Type(() => Number)
  dlpCatProducto: number;

  @Expose({ name: 'DLP_PRECIO' })
  @Type(() => Number)
  dlpPrecio: number;

  @Expose({ name: 'FAC_FACTOR' })
  @Type(() => Number)
  facFactor: number;
}
class ProductoCategoria {
  @Expose({ name: 'PCT_EMPRESA' })
  @Type(() => Number)
  pctEmpresa: number;

  @Expose({ name: 'PCT_CODIGO' })
  @Type(() => Number)
  pctCodigo: number;

  @Expose({ name: 'PCT_ID' })
  @Type(() => String)
  pctId: string;

  @Expose({ name: 'PCT_NOMBRE' })
  @Type(() => String)
  pctNombre: string;
}

class Producto {
  @Expose({ name: 'PRO_EMPRESA' })
  @Type(() => Number)
  proEmpresa: number;

  @Expose({ name: 'CCO_CODIGO' })
  @Type(() => Number)
  ccoCodigo: number;

  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'UMD_ID' })
  @Type(() => String)
  umdId: string;

  @Expose({ name: 'PRO_COMBO' })
  @Type(() => Number)
  proCombo: number;

  @Expose({ name: 'UMD_CODIGO' })
  @Type(() => Number)
  umdCodigo: number;

  @Expose({ name: 'CIV_CATPRODUCTO' })
  @Type(() => Number)
  civCatProducto: number;

  @Expose({ name: 'CCO_AGENTE' })
  @Type(() => Number)
  ccoAgente: number;

  @Expose({ name: 'UGP_USUARIO' })
  @Type(() => Number)
  ugpUsuario: number;

  @Expose({ name: 'PRO_STOCK' })
  @Type(() => Number)
  proStock: number;

  @Expose({ name: 'GPR_ID' })
  @Type(() => String)
  gprId: string;

  @Expose({ name: 'PRO_PESO' })
  @Type(() => Number)
  proPeso: number;

  @Expose({ name: 'PRO_IMPUESTO' })
  @Type(() => Number)
  proImpuesto: number;

  @Expose({ name: 'PRO_TPRODUCTO' })
  @Type(() => Number)
  proTProducto: number;

  @Expose({ name: 'TPR_ID1' })
  @Type(() => String)
  tprId1: String;

  @Expose({ name: 'TPR_ID' })
  @Type(() => String)
  tprId: String;

  @Expose({ name: 'GPR_TIPO_RENTA' })
  @Type(() => Number)
  gprTipoRenta: number;
}

class ProductoCombo {
  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'PRO_CODIGO_PROMO' })
  @Type(() => Number)
  proCodigoPromo: number;

  @Expose({ name: 'PRO_ID_PROMO' })
  @Type(() => String)
  proIdPromo: string;

  @Expose({ name: 'PRO_NOMBRE_PROMO' })
  @Type(() => String)
  proNombrePromo: string;

  @Expose({ name: 'PRO_ENVASE' })
  @Type(() => Number)
  proEnvase: number | null;

  @Expose({ name: 'COM_UNIDAD' })
  @Type(() => Number)
  comUnidad: number;

  @Expose({ name: 'UMD_ID' })
  @Type(() => String)
  umdId: string;

  @Expose({ name: 'UGP_USUARIO' })
  @Type(() => Number)
  ugpUsuario: number;

  @Expose({ name: 'PRO_EMPRESA' })
  @Type(() => Number)
  proEmpresa: number;

  @Expose({ name: 'PRO_IMPUESTO' })
  @Type(() => Number)
  proImpuesto: number;

  @Expose({ name: 'GPR_CODIGO' })
  @Type(() => Number)
  gprCodigo: number;

  @Expose({ name: 'UNIDAD_PROMO' })
  @Type(() => String)
  unidadPromo: string;

  @Expose({ name: 'COM_CANTIDAD' })
  @Type(() => Number)
  comCantidad: number;

  @Expose({ name: 'COM_PROMOCION' })
  @Type(() => Number)
  comPromocion: number;

  @Expose({ name: 'PRO_TIPO_COMBO' })
  @Type(() => Number)
  proTipoCombo: number | null;
}

class ListaDescuento {
  @Expose({ name: 'DLD_CODIGO' })
  @Type(() => Number)
  dldCodigo: number;

  @Expose({ name: 'DLD_LISTAPRE' })
  @Type(() => Number)
  dldListPre: number;

  @Expose({ name: 'DLD_PRODUCTO' })
  @Type(() => Number)
  dldProducto: number;

  @Expose({ name: 'DLD_UMEDIDA' })
  @Type(() => Number)
  dldUMedida: number;

  @Expose({ name: 'DLD_EMPRESA' })
  @Type(() => Number)
  dldEmpresa: number;

  @Expose({ name: 'DLD_CLIENTE' })
  @Type(() => Number)
  dldCliente: number;

  @Expose({ name: 'DLD_ALMACEN' })
  @Type(() => Number)
  dldAlmacen: number;

  @Expose({ name: 'DLD_CATPRODUCTO' })
  @Type(() => Number)
  dldCatProducto: number;

  @Expose({ name: 'DSCTO' })
  @Type(() => Number)
  dscto: number;

  @Expose({ name: 'CLI_RUTA' })
  @Type(() => Number)
  cliRuta: number;
}

class TipoVisita {
  @Expose({ name: 'TVI_CODIGO' })
  @Type(() => Number)
  tviCodigo: number;

  @Expose({ name: 'TVI_NOMBRE' })
  @Type(() => String)
  tviNombre: string;

  @Expose({ name: 'TVI_ACCION' })
  @Type(() => Number)
  tviAccion: number;

  @Expose({ name: 'TVI_SOLIDAT' })
  @Type(() => Number)
  tviSoliDat: number | null;
}

class ListaNegraTelefono {
  @Expose({ name: 'LNE_CODIGO' })
  @Type(() => Number)
  lneCodigo: number;

  @Expose({ name: 'LNE_DETALLE' })
  @Type(() => String)
  lneDetalle: string;

  @Expose({ name: 'LNE_TIPO' })
  @Type(() => Number)
  lneTipo: number;
}
class Presupuesto {
  @Expose({ name: 'PRE_RUTA' })
  @Type(() => String)
  preRuta: string;

  @Expose({ name: 'PRE_GPRCELYASA_ID' })
  @Type(() => String)
  preGprCelyasaId: string;

  @Expose({ name: 'PRE_UNIDAD' })
  @Type(() => String)
  preUnidad: string;

  @Expose({ name: 'PRE_PRESUPUESTO' })
  @Type(() => Number)
  prePresupuesto: number;
}
class PedidoSugerido {
  @Expose({ name: 'CLI_CODIGO' })
  @Type(() => Number)
  cliCodigo: number;

  @Expose({ name: 'CLI_ID' })
  @Type(() => String)
  cliId: string;

  @Expose({ name: 'CLI_NOMBRE' })
  @Type(() => String)
  cliNombre: string;

  @Expose({ name: 'CLI_AGENTE' })
  @Type(() => Number)
  cliAgente: number;

  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'CANTIDAD' })
  @Type(() => Number)
  cantidad: number;

  @Expose({ name: 'CLI_RUTA' })
  @Type(() => Number)
  cliRuta: number;

  @Expose({ name: 'GPR_ID' })
  @Type(() => String)
  gprId: string;
}
class AutualizacionDatosCliente {
  @Expose({ name: 'CLI_CODIGO' })
  @Type(() => Number)
  cliCodigo: number;
}
class DatosCreaCliente {
  @Expose({ name: 'TPC_CODIGO' })
  @Type(() => Number)
  tpcCodigo: number;

  @Expose({ name: 'TPC_ACT_TIPOCAMPO' })
  @Type(() => Number)
  tpcActTipoCampo: number;

  @Expose({ name: 'TPC_OPCION' })
  @Type(() => String)
  tpcOpcion: string;
}

class InfoCreaCliente {
  @Expose({ name: 'CODIGO' })
  @Type(() => Number)
  codigo: number;

  @Expose({ name: 'NOMBRE' })
  @Type(() => String)
  nombre: string;

  @Expose({ name: 'TIPO' })
  @Type(() => String)
  tipo: string;
}
class ComboMix {
  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'RUT_CODIGO' })
  @Type(() => Number)
  rutCodigo: number;

  @Expose({ name: 'RUT_ID' })
  @Type(() => String)
  rutId: string;

  @Expose({ name: 'ALM_CODIGO' })
  @Type(() => Number)
  almCodigo: number;

  @Expose({ name: 'ALM_NOMBRE' })
  @Type(() => String)
  almNombre: string;

  @Expose({ name: 'GCM_CANAL' })
  @Type(() => String)
  gcmCanal: string;

  @Expose({ name: 'GCM_PRINCIPAL' })
  @Type(() => Number)
  gcmPrincipal: number;

  @Expose({ name: 'GCM_COMBO' })
  @Type(() => Number)
  gcmCombo: number;
}
