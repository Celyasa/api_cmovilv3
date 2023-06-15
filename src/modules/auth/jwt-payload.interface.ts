export interface IJwtPayload {
  ucmCodigo: number;
  ucmId: string;
  ucmNombre: string;
  ucmCliente: number;
  ucmServidor: string;
  ucmVersion: string;
  ucmNuevaVersion: String;
  ucmEmpresa: number;

  //Para tener acceso a la configuracion para el Telefono 0:Activo-1:Inactivo
  ucmConfigura: number;

  //Para ver si es Autoventa o Preventa
  ucmModulo: number;

  //Verificar si es activo
  ucmInactivo: number;

  ucmAgeCodigo: number;
}
