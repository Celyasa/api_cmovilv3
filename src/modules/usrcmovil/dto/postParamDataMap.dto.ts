import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class postParamDataMapDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta ageCodigo' })
  @IsNumber()
  ageCodigo: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta fecha' })
  fecha: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta almId' })
  @IsNumber()
  almId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  usuModulo: number;
}
