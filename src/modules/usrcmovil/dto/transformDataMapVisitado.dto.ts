import { Expose, Type } from 'class-transformer';

export class transformDataMapVisitadoDto {
  @Expose({ name: 'LOG_COD_AGENTE' })
  @Type(() => Number)
  logCodAgente: number;

  @Expose({ name: 'FECHA' })
  @Type(() => Date)
  fecha: Date;

  @Expose({ name: 'LOG_FECHA_CREA' })
  @Type(() => Date)
  logFechaCrea: Date;

  @Expose({ name: 'CLI_ID' })
  @Type(() => String)
  cliId: string;

  @Expose({ name: 'CLI_NOMBRE' })
  @Type(() => String)
  cliNombre: string;

  @Expose({ name: 'LOG_LATITUD' })
  @Type(() => Number)
  logLatitud: number;

  @Expose({ name: 'LOG_LONGITUD' })
  @Type(() => Number)
  logLongitud: number;

  @Expose({ name: 'LOG_TVI_ACCION' })
  @Type(() => Number)
  logTviAccion: number;

  @Expose({ name: 'LOG_OBSERVACION' })
  @Type(() => String)
  logObservacion: string;

  @Expose({ name: 'CLI_TELEFONO1' })
  @Type(() => String)
  cliTelefono1: string;

  @Expose({ name: 'CLI_TELEFONO2' })
  @Type(() => String)
  cliTelefono2: string;

  @Expose({ name: 'CLI_TELEFONO3' })
  @Type(() => String)
  cliTelefono3: string;

  @Expose({ name: 'CLI_DIRECCION' })
  @Type(() => String)
  cliDireccion: string;

  @Expose({ name: 'TIPO_DISTANCIA' })
  @Type(() => Number)
  tipDistancia: number;

  @Expose({ name: 'TIPO' })
  @Type(() => String)
  tipo: string;

  @Expose({ name: 'DISTANCIA' })
  @Type(() => String)
  distancia: string;

  @Expose({ name: 'DOCUMENTO' })
  @Type(() => String)
  documento: string;

  @Expose({ name: 'ENT_COB' })
  @Type(() => Number)
  entCob: number;
}
