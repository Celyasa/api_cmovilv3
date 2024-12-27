import { Expose, Transform, Type } from 'class-transformer';

export function ToFixed(decimals: number) {
  return Transform(({ value }) => {
    return parseFloat(value.toFixed(decimals));
  });
}

export class transformDescargarDatosDto {
  @Expose({ name: 'cmovilVersion' })
  @Type(() => String)
  cmovilVersion: string;

  @Type(() => Lq)
  lq: Lq[];

  @Type(() => Cliente)
  cliente: Cliente[];

  @Type(() => Politica)
  politica: Politica[];

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

  @Type(() => CiudadParroquia)
  ciudadParroquia: CiudadParroquia[];

  // @Type(() => ComboMix)
  // comboMix: ComboMix[];

  @Type(() => Componente)
  componente: Componente[];

  @Type(() => ComboPackC)
  comboPackC: ComboPackC[];

  @Type(() => ComboPackD)
  comboPackD: ComboPackD[];

  @Type(() => DescuentoEscaladoC)
  descuentoEscaladoC: DescuentoEscaladoC[];

  @Type(() => DescuentoEscaladoD)
  descuentoEscaladoD: DescuentoEscaladoD[];

  @Type(() => FacturaC)
  facturaC: FacturaC[];

  @Type(() => Secuencia)
  secuencia: Secuencia[];

  @Type(() => TipoPago)
  tipoPago: TipoPago[];

  @Type(() => Emisor)
  emisor: Emisor[];
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
class Politica {
  @Expose({ name: 'ID' })
  @Type(() => String)
  id: string;

  @Expose({ name: 'POL_EMPRESA' })
  @Type(() => Number)
  polEmpresa: number;

  @Expose({ name: 'POL_CODIGO' })
  @Type(() => Number)
  polCodigo: number;

  @Expose({ name: 'POL_NOMBRE' })
  @Type(() => String)
  polNombre: string;

  @Expose({ name: 'POL_DESC_MAXIMO' })
  @Type(() => Number)
  polDescMaximo: number;

  @Expose({ name: 'POL_PREVENTA' })
  @Type(() => Number)
  polPreventa: number;

  @Expose({ name: 'POL_POLITICA' })
  @Type(() => String)
  polPolitica: string;

  @Expose({ name: 'POL_NIVEL' })
  @Type(() => Number)
  polNivel: number;

  @Expose({ name: 'POL_PORC_FINANC' })
  @Type(() => Number)
  polPorcFinanc: number;

  @Expose({ name: 'POL_PORC_PRO_PAGO' })
  @Type(() => Number)
  polPorcProPago: number;

  @Expose({ name: 'POL_GRUPO' })
  @Type(() => Number)
  polGrupo: number;
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

  @Expose({ name: 'CLI_ILIMITADO' })
  @Type(() => Number)
  cliIlimitado: number;

  @Expose({ name: 'PARROQUIA' })
  @Type(() => String)
  parroquia: string;

  @Expose({ name: 'CIUDAD' })
  @Type(() => String)
  ciudad: string;

  @Expose({ name: 'CLI_RUTA' })
  @Type(() => Number)
  cliRuta: number;

  // @Expose({ name: 'SIS_IMPUESTO_VENTA' })
  // @Type(() => Number)
  // sisImpuestoVenta: number;

  // @Expose({ name: 'IMP_PORCENTAJE' })
  // @Type(() => Number)
  // impPorcentaje: number;

  @Expose({ name: 'CLI_SOLICITA_DATOS' })
  @Type(() => Number)
  cliSolicitaDatos: number | null;

  @Expose({ name: 'CLI_POLITICAS' })
  @Type(() => Number)
  cliPoliticas: number | null;

  @Expose({ name: 'CLI_POLITICAS_PMI' })
  @Type(() => Number)
  cliPoliticasPMI: number | null;

  @Expose({ name: 'CLI_LISTAPRE_PMI' })
  @Type(() => Number)
  cliListaPMI: number | null;

  @Expose({ name: 'CLI_CUPO_PMI' })
  @Type(() => Number)
  cliCupoPMI: number | null;

  @Expose({ name: 'CLI_ILIMITADO_PMI' })
  @Type(() => Number)
  cliIlimitadoPMI: number | null;

  @Expose({ name: 'CLI_TIPOCLI' })
  @Type(() => Number)
  cliTipoCli: number | null;

  @Expose({ name: 'CCO_CODIGO' })
  @Type(() => String)
  ccoCodigo: string;
}

class ListaPrecio {
  @Expose({ name: 'DLP_CODIGO' })
  @Type(() => Number)
  dlpCodigo: number;

  @Expose({ name: 'DLP_LISTAPRE' })
  @Type(() => Number)
  dlpListPre: number;

  @Expose({ name: 'LPR_NOMBRE' })
  @Type(() => String)
  lprNombre: string;

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

  @Expose({ name: 'PRO_CLASIFICACION' })
  @Type(() => Number)
  proClasificacion: number;

  @Expose({ name: 'GPR_GRUPO' })
  @Type(() => Number)
  gprGrupo: number;
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

  @Expose({ name: 'PRO_CLASIFICACION' })
  @Type(() => Number)
  proClasificacion: number | null;
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

  @Expose({ name: 'TVI_SUBTIPO' })
  @Type(() => Number)
  tviSubTipo: number;
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
  // "EMPRESA": 2,
  // "CODIGO": 4250000731,
  // "NOMBRE": "TIENDA",
  // "TIPO": "4"

  @Expose({ name: 'EMPRESA' })
  @Type(() => Number)
  empCodigo: number;

  @Expose({ name: 'CODIGO' })
  @Type(() => Number)
  datCodigo: number;

  @Expose({ name: 'NOMBRE' })
  @Type(() => String)
  datNombre: string;

  @Expose({ name: 'TIPO' })
  @Type(() => Number)
  dataTipo: number;
}

class CiudadParroquia {
  @Expose({ name: 'UBI_CODIGO' })
  @Type(() => Number)
  ubiCodigo: number;

  @Expose({ name: 'UBI_NOMBRE' })
  @Type(() => String)
  ubiNombre: string;

  @Expose({ name: 'UBI_REPORTA' })
  @Type(() => Number)
  ubiReporta: number;
}
// class ComboMix {
//   @Expose({ name: 'PRO_CODIGO' })
//   @Type(() => Number)
//   proCodigo: number;

//   @Expose({ name: 'PRO_ID' })
//   @Type(() => String)
//   proId: string;

//   @Expose({ name: 'PRO_NOMBRE' })
//   @Type(() => String)
//   proNombre: string;

//   @Expose({ name: 'RUT_CODIGO' })
//   @Type(() => Number)
//   rutCodigo: number;

//   @Expose({ name: 'RUT_ID' })
//   @Type(() => String)
//   rutId: string;

//   @Expose({ name: 'ALM_CODIGO' })
//   @Type(() => Number)
//   almCodigo: number;

//   @Expose({ name: 'ALM_NOMBRE' })
//   @Type(() => String)
//   almNombre: string;

//   @Expose({ name: 'GCM_CANAL' })
//   @Type(() => String)
//   gcmCanal: string;

//   @Expose({ name: 'GCM_PRINCIPAL' })
//   @Type(() => Number)
//   gcmPrincipal: number;

//   @Expose({ name: 'GCM_COMBO' })
//   @Type(() => Number)
//   gcmCombo: number;
// }

class Componente {
  @Expose({ name: 'UMD_ID' })
  @Type(() => String)
  umdId: string;

  @Expose({ name: 'UGP_USUARIO' })
  @Type(() => Number)
  ugpUsuario: number;

  @Expose({ name: 'PRO_TIPO_COMBO' })
  @Type(() => String)
  proTipoCombo: string | null;

  @Expose({ name: 'PRO_NOMBRE_PROMO' })
  @Type(() => String)
  proNombrePromo: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'PRO_IMPUESTO' })
  @Type(() => Number)
  proImpuesto: number;

  @Expose({ name: 'PRO_ID_PROMO' })
  @Type(() => String)
  proIdPromo: string;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_ENVASE' })
  @Type(() => String)
  proEnvase: string | null;

  @Expose({ name: 'PRO_EMPRESA' })
  @Type(() => Number)
  proEmpresa: number;

  @Expose({ name: 'PRO_CODIGO_PROMO' })
  @Type(() => Number)
  proCodigoPromo: number;

  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'COM_UNIDAD' })
  @Type(() => Number)
  comUnidad: number;

  @Expose({ name: 'COM_PROMOCION' })
  @Type(() => Number)
  comPromocion: number;

  @Expose({ name: 'COM_CANTIDAD' })
  @Type(() => Number)
  comCantidad: number;
}

class ComboPackC {
  @Expose({ name: 'COP_EMPRESA' })
  @Type(() => Number)
  copEmpresa: number;

  @Expose({ name: 'COP_CODIGO' })
  @Type(() => Number)
  copCodigo: number;

  @Expose({ name: 'COP_ID' })
  @Type(() => String)
  copId: string;

  @Expose({ name: 'COP_NOMBRE' })
  @Type(() => String)
  copNombre: string;

  @Expose({ name: 'COP_CANTIDADN' })
  @Type(() => Number)
  copCantidadN: number;

  @Expose({ name: 'COP_CANTIDADP' })
  @Type(() => Number)
  copCantidadP: number;

  @Expose({ name: 'COP_DESCUENTO' })
  @Type(() => Number)
  copDescuento: number;

  @Expose({ name: 'COP_PORCENTAJE' })
  @Type(() => Number)
  copPorcentaje: number;

  @Expose({ name: 'COP_INACTIVO' })
  @Type(() => Number)
  copInactivo: number;

  @Expose({ name: 'COP_CANTIDADD' })
  @Type(() => Number)
  copCantidadD: number;

  @Expose({ name: 'COP_COMBOVIRTUAL' })
  @Type(() => Number)
  copComboVirtual: number;

  @Expose({ name: 'CTR_ALMACEN' })
  @Type(() => Number)
  ctrAlmacen: number;

  @Expose({ name: 'CTR_RUTA' })
  @Type(() => Number)
  ctrRuta: number;

  @Expose({ name: 'CTR_CANAL' })
  @Type(() => Number)
  ctrCanal: number;

  @Expose({ name: 'COP_PROCLASIFICACION' })
  @Type(() => Number)
  copProClasificacion: number;

  @Expose({ name: 'CTR_CANTIDAD' })
  @Type(() => Number)
  ctrCantidad: number;

  @Expose({ name: 'CTR_TIPO_CP' })
  @Type(() => Number)
  ctrTipoCp: number;

  @Expose({ name: 'COP_PORCENTAJE_N' })
  @Type(() => Number)
  copPorcentajeN: number;
}

class ComboPackD {
  @Expose({ name: 'COD_EMPRESA' })
  @Type(() => Number)
  codEmpresa: number;

  @Expose({ name: 'COD_CODIGO' })
  @Type(() => Number)
  codCodigo: number;

  @Expose({ name: 'COD_TIPO' })
  @Type(() => Number)
  codTipo: number;

  @Expose({ name: 'COD_COMPONE' })
  @Type(() => Number)
  codCompone: number;

  @Expose({ name: 'COD_INACTIVO' })
  @Type(() => Number)
  codInactivo: number;

  @Expose({ name: 'CTR_ALMACEN' })
  @Type(() => Number)
  ctrAlmacen: number;

  @Expose({ name: 'COD_GRUPO' })
  @Type(() => Number)
  codGRupo: number;
}

class DescuentoEscaladoC {
  @Expose({ name: 'LDR_EMPRESA' })
  @Type(() => Number)
  ldrEmpresa: number;

  @Expose({ name: 'LDR_RANGO' })
  @Type(() => Number)
  ldrRango: number;

  @Expose({ name: 'LDR_TPRODUCTO' })
  @Type(() => Number)
  ldrTproducto: number;

  @Expose({ name: 'LDR_PRODUCTO' })
  @Type(() => Number)
  ldrProducto: number;

  @Expose({ name: 'LDR_TIPO_CLIENTE' })
  @Type(() => Number)
  ldrTipoCliente: number;

  @Expose({ name: 'LDR_ALMACEN' })
  @Type(() => Number)
  ldrAlmacen: number;

  @Expose({ name: 'LDR_LISTAPRE' })
  @Type(() => Number)
  ldrListaPre: number;

  @Expose({ name: 'LDR_PROCLASIFICACION' })
  @Type(() => Number)
  ldrProClasificacion: number;

  @Expose({ name: 'LDR_CODIGO' })
  @Type(() => Number)
  ldrCodigo: number;
}

class DescuentoEscaladoD {
  @Expose({ name: 'CDS_EMPRESA' })
  @Type(() => Number)
  cdsEmpresa: number;

  @Expose({ name: 'CDS_RANGO' })
  @Type(() => Number)
  cdsRango: number;

  @Expose({ name: 'CDS_DESCRIPCION' })
  @Type(() => String)
  cdsDescripcion: string;

  @Expose({ name: 'CDS_CANTIDAD_MIN' })
  @Type(() => Number)
  cdsCantidadMin: number;

  @Expose({ name: 'CDS_CANTIDAD_MAX' })
  @Type(() => Number)
  cdsCantidadMax: number;

  @Expose({ name: 'CDS_PORCENTAJE' })
  @Type(() => Number)
  cdsPorcentaje: number;

  @Expose({ name: 'CDS_NIVEL' })
  @Type(() => Number)
  cdsNivel: number;
}

class FacturaC {
  @Expose({ name: 'FACTURA' })
  @Type(() => String)
  factura: string;

  @Expose({ name: 'CCO_FECHA' })
  @Type(() => Date)
  ccoFecha: Date;

  @Expose({ name: 'TOT_TOTAL' })
  @Type(() => Number)
  @ToFixed(2)
  totTotal: number;

  @Expose({ name: 'DDO_PAGO' })
  @Type(() => Number)
  ddoPago: number;

  @Expose({ name: 'DDO_MONTO' })
  @Type(() => Number)
  @ToFixed(2)
  ddoMonto: number;

  @Expose({ name: 'DDO_FECHA_VEN' })
  @Type(() => Date)
  ddoFechaVen: Date;

  @Expose({ name: 'ABONO' })
  @Type(() => Number)
  @ToFixed(2)
  abono: number;

  @Expose({ name: 'SALDO' })
  @Type(() => Number)
  @ToFixed(2)
  saldo: number;

  @Expose({ name: 'DIAS' })
  @Type(() => Number)
  dias: number;

  @Expose({ name: 'CCO_CODCLIPRO' })
  @Type(() => Number)
  ccoCodCliPro: number;

  @Expose({ name: 'TIPO' })
  @Type(() => String)
  tipo: string;
}

class Secuencia {
  @Expose({ name: 'DTI_CTI_CODIGO' })
  @Type(() => Number)
  dtiCtiCodigo: number;

  @Expose({ name: 'DTI_NUMERO' })
  @Type(() => Number)
  dtiNumero: number;

  @Expose({ name: 'DTI_SERIE' })
  @Type(() => Number)
  dtiSerie: number;
}

class TipoPago {
  @Expose({ name: 'TPA_CODIGO' })
  @Type(() => Number)
  tpaCodigo: number;

  @Expose({ name: 'TPA_ID' })
  @Type(() => String)
  tpaId: string;

  @Expose({ name: 'TPA_NOMBRE' })
  @Type(() => String)
  tpaNombre: string;

  @Expose({ name: 'TPA_DETALLE' })
  @Type(() => Number)
  tpaDetalle: number;

  @Expose({ name: 'TPA_CONTABILIZA' })
  @Type(() => Number)
  tpaContabiliza: number;
}

class Emisor {
  @Expose({ name: 'EMI_CODIGO' })
  @Type(() => Number)
  emiCodigo: number;

  @Expose({ name: 'EMI_NOMBRE' })
  @Type(() => String)
  emiNombre: string;
}
