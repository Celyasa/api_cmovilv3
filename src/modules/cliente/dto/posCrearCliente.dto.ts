import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class posCrearClienteDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  //   @IsNotEmpty({ message: 'Falta secuencia' })
  cliEmpresa: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  ucmAgeCodigo: number;

  @ApiProperty()
  @Expose()
  @IsString()
  cliNombre: string;

  @ApiProperty()
  @Expose()
  @IsString()
  cliNombreCom: string;

  @ApiProperty()
  @Expose()
  @IsString()
  cliRucCedula: string;

  @ApiProperty()
  @Expose()
  @IsString()
  cliDireccion: string;

  @ApiProperty()
  @Expose()
  @IsString()
  cliRefDireccion: string;

  @ApiProperty()
  @Expose()
  @IsString()
  cliTelefono1: string; //Telefono convencional

  @ApiProperty()
  @Expose()
  @IsString()
  cliTelefono2: string; //Telefono celular

  @ApiProperty()
  @Expose()
  @IsString()
  cliMail: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliSexo: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliEstadoCivil: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliCiudad: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliParroquia: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliOrigenIngresos: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliLatitud: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliLongitud: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliVendeLicor: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliRuta: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  cliTipoCli: number;
}
