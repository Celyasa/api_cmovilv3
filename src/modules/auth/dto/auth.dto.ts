import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthDto {
  @Expose()
  ucmCodigo: number;

  @Expose()
  ucmId: string;

  @Expose()
  ucmNombre: string;

  @Expose()
  ucmServidor: string;

  @Expose()
  ucmVersion: string;

  @Expose()
  ucmNuevaVersion: String;
}
