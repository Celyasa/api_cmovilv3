import { Expose, Type } from 'class-transformer';

export class transformDataMapPendienteDto {
  @Expose({ name: 'RUT_ID' })
  @Type(() => String)
  rutId: string;

  @Expose({ name: 'LIQUIDACION' })
  @Type(() => String)
  liquidacion: string;

  @Expose({ name: 'CCO_FECHA' })
  @Type(() => Date)
  ccoFecha: Date;

  @Expose({ name: 'RUT_CODIGO' })
  @Type(() => Number)
  rutCodigo: number;

  @Expose({ name: 'AGE_CODIGO' })
  @Type(() => Number)
  ageCodigo: number;

  @Expose({ name: 'AGE_NOMBRE' })
  @Type(() => String)
  ageNombre: string;

  @Expose({ name: 'CCO_ADESTINO' })
  @Type(() => Number)
  ccoADestino: number;

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
  cliTelefono2: string;

  @Expose({ name: 'CLI_TELEFONO3' })
  @Type(() => String)
  cliTelefono3: string;

  @Expose({ name: 'CLI_MAIL' })
  @Type(() => String)
  cliMail: string;

  @Expose({ name: 'CLI_LATITUD' })
  @Type(() => Number)
  cliLatitud: number;

  @Expose({ name: 'CLI_LONGITUD' })
  @Type(() => Number)
  cliLongitud: number;
}
