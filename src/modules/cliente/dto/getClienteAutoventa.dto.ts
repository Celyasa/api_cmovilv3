import { Expose, Type } from 'class-transformer';
export class getClienteAutoventaDto {
  @Expose({ name: 'CLI_CODIGO' })
  @Type(() => Number)
  cliCodigo: number;

  @Expose({ name: 'CLI_NOMBRE' })
  @Type(() => String)
  cliNombre: string;

  @Expose({ name: 'CLI_RUTA' })
  @Type(() => Number)
  cliRuta: number;

  @Expose({ name: 'CLI_IMP_VENTA' })
  @Type(() => Number)
  cliImpVenta: number;

  @Expose({ name: 'CLI_DIRECCION' })
  @Type(() => String)
  cliDireccion: string;

  @Expose({ name: 'CLI_TELEFONO1' })
  @Type(() => String)
  cliTelefono1: string;

  @Expose({ name: 'CLI_CUPO' })
  @Type(() => Number)
  cliCupo: number;

  @Expose({ name: 'CCL_NOMBRE' })
  @Type(() => String)
  cclNombre: string;

  @Expose({ name: 'CLI_LISTAPRE' })
  @Type(() => Number)
  cliListaPre: number;

  @Expose({ name: 'CLI_ILIMITADO' })
  @Type(() => Number)
  cliIlimitado: number;

  @Expose({ name: 'CLI_ZONA' })
  @Type(() => Number)
  cliZona: number;

  @Expose({ name: 'CLI_ORDEN' })
  @Type(() => Number)
  cliOrden: number | null;

  @Expose({ name: 'CLI_LATITUD' })
  @Type(() => Number)
  cliLatitud: number;

  @Expose({ name: 'CLI_LONGITUD' })
  @Type(() => Number)
  cliLongitud: number;

  @Expose({ name: 'CLI_BLANCOGRIS' })
  @Type(() => Number)
  cliBlancoGris: number;

  @Expose({ name: 'CLI_POLITICAS' })
  @Type(() => Number)
  cliPoliticas: number;

  @Expose({ name: 'CLI_PORCIMP_VENTA' })
  @Type(() => Number)
  cliPorcimpVenta: number;

  @Expose({ name: 'CLI_RUC_CEDULA' })
  @Type(() => String)
  cliRucCedula: string;

  @Expose({ name: 'CLI_CIUDAD' })
  @Type(() => Number)
  cliCiudad: number;

  @Expose({ name: 'CLI_IMPUESTOS' })
  @Type(() => Number)
  cliImpuestos: number;

  @Expose({ name: 'CLI_ID' })
  @Type(() => String)
  cliId: string;

  @Expose({ name: 'CLI_NOMBRECOM' })
  @Type(() => String)
  cliNombreCom: null | string;

  @Expose({ name: 'PARROQUIA' })
  @Type(() => String)
  parroquia: null | string;

  @Expose({ name: 'CLI_REF_DIRECCION' })
  @Type(() => String)
  cliRefDireccion: null | string;

  @Expose({ name: 'CLI_MAIL' })
  @Type(() => String)
  cliMail: null | string;

  @Expose({ name: 'POL_NOMBRE' })
  @Type(() => String)
  polNombre: string;

  @Expose({ name: 'CAT_NOMBRE' })
  @Type(() => String)
  catNombre: string;

  @Expose({ name: 'LPR_NOMBRE' })
  @Type(() => String)
  lprNombre: string;

  @Expose({ name: 'TCL_NOMBRE' })
  @Type(() => String)
  tclNombre: string;

  @Expose({ name: 'AGE_NOMBRE' })
  @Type(() => String)
  ageNombre: string;

  @Expose({ name: 'ENT_COB' })
  @Type(() => String)
  entCob: null | string;

  @Expose({ name: 'CLI_BLOQUEO' })
  @Type(() => Number)
  cliBloqueo: number;

  @Expose({ name: 'VALOR_MINFAC' })
  @Type(() => String)
  valorMinFac: string;

  @Expose({ name: 'VALOR_MINFACRE' })
  @Type(() => String)
  valorMinFacre: string;

  @Expose({ name: 'CLI_SEGMENTACION' })
  @Type(() => Number)
  cliSegmentacion: number;
}
