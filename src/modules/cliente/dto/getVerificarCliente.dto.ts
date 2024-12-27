import { Expose, Type } from 'class-transformer';

export class getVerificarClienteDto {
  @Expose({ name: 'CLI_CODIGO' })
  @Type(() => Number)
  cliCodigo: number;

  @Expose({ name: 'RUTA_1' })
  @Type(() => Number)
  ruta1: number;

  @Expose({ name: 'RUTA_2' })
  @Type(() => Number)
  ruta2: number;
}
