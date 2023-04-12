import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigInDto {
  @ApiProperty({ description: 'Usuario asignado' })
  @IsNotEmpty({ message: 'Falta ucmId' })
  ucmId: string;
}
