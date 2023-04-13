import { Expose, Type } from 'class-transformer';
export class getProductoAutoventaDto {
  @Expose({ name: 'PRO_CODIGO' })
  @Type(() => Number)
  proCodigo: number;

  @Expose({ name: 'PRO_ID' })
  @Type(() => String)
  proId: string;

  @Expose({ name: 'PRO_NOMBRE' })
  @Type(() => String)
  proNombre: string;

  @Expose({ name: 'PRO_STOCK' })
  @Type(() => Number)
  proStock: number;

  @Expose({ name: 'GPR_ID' })
  @Type(() => String)
  gprId: string;

  @Expose({ name: 'PRO_PESO' })
  @Type(() => Number)
  proPeso: number;
}
