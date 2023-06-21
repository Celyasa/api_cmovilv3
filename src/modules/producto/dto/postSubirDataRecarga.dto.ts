import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class postSubirDataRecargaDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta lqAut' })
  @IsString()
  lqAut: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta pedId' })
  @IsNumber()
  pedId: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta Detalle' })
  @IsArray()
  @Type(() => Detalle)
  // @ValidateNested()
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
