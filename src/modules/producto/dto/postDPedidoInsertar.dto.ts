import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class postDPedidoInsertarDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta codLQ' })
  codLQ: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta proSecuencia' })
  proSecuencia: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta proCodigo' })
  proCodigo: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta proCantidad' })
  proCantidad: number;
}
