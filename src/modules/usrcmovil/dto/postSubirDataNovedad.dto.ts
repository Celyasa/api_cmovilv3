import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class postSubirDataNovedadDto {
  @ApiProperty()
  @IsNumber()
  @Expose()
  nclId: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ccaEmpresa: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  logCodigo: number;

  @ApiProperty()
  @IsNumber()
  @Expose()
  ucmAlmCodigo: number;

  @ApiProperty()
  @IsDate()
  @Expose()
  @Type(() => Date)
  fechaCrea: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  @Type(() => Date)
  logFechaTrans: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  @Type(() => Date)
  nclFechaIni: Date;

  @ApiProperty()
  @IsDate()
  @Expose()
  @Type(() => Date)
  nclFechaFin: Date;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logTipoDoc: number;

  @ApiProperty()
  @IsString()
  @Expose()
  ucmId: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  ageCodigo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  nclLatitud: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  nclLongitud: number;

  @ApiProperty()
  @IsString()
  @Expose()
  logCodigoLq: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliCodigo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliRuta: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  novTviCodigo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logTviTipo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  novTviAccion: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  novTviSubtipo: number;

  @ApiProperty()
  @Expose()
  @IsString()
  nclDescripcion: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logEntCob: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logModulo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logEficiencia: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  logEfectividad: number;
}
