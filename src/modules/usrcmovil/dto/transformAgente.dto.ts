import { Expose, Type } from 'class-transformer';

export class transformAgenteDto {
  @Expose({ name: 'AGE_CODIGO' })
  @Type(() => Number)
  ageCodigo: number;

  @Expose({ name: 'AGE_NOMBRE' })
  @Type(() => String)
  ageNombre: string;

  @Expose({ name: 'UCM_MODULO' })
  @Type(() => Number)
  ucmModulo: number;

  @Expose({ name: 'CAN_NOMBRE' })
  @Type(() => String)
  canNombre: string;

  @Expose({ name: 'AGE_ALMACEN' })
  @Type(() => Number)
  ageAlmacen: number;
}
