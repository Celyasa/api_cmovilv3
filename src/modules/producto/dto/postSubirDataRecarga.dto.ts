import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class postSubirDataRecargaDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Falta lqAut' })
  lqAut: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'Falta pedId' })
  pedId: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta Detalle' })
  @Type(() => Detalle)
  detalle: Detalle[];
}

class Detalle {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'Falta pedId' })
  pedId: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Falta proCodigo' })
  proCodigo: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Falta proCantidad' })
  proCantidad: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty({ message: 'Falta secuencia' })
  secuencia: number;
}
