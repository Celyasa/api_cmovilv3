import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class postCPedidoInsertarDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty({ message: 'Falta lqAut' })
  lqAut: string;
}
