import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigInWebDto {
  @ApiProperty({ description: 'Usuario asignado' })
  @IsNotEmpty({ message: 'Falta usuUsuario' })
  usuUsuario: string;

  @ApiProperty({ description: 'Contrasenia asignado' })
  @IsNotEmpty({ message: 'Falta usuClave' })
  usuClave: string;
}
