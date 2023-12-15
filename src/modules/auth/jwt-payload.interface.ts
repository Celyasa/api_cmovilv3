export interface IJwtPayload {
  ucmCodigo: number;
  ucmId: string;
  ucmNombre: string;
  ucmCliente: number;
  ucmServidor: string;
  ucmVersion: string;
  ucmNuevaVersion: string;
  ucmEmpresa: number;

  //Para tener acceso a la configuracion para el Telefono 0:Activo-1:Inactivo
  ucmConfigura: number;

  //Para ver si es Autoventa o Preventa
  ucmModulo: number;

  //Verificar si es activo
  ucmInactivo: number;

  ucmAgeCodigo: number;

  ucmAlmCodigo: number;
}

export interface IJwtPayloadWeb {
  almacen: Almacen;
  UCM_CLAVE: string;
  UCM_CODIGO: number;
  UCM_AGE_CODIGO: number;
  UCM_NIVEL_USUARIO: number;
  UCM_NOMBRE: string;
}
export class Almacen {
  ALM_NOMBRE: string;
  UAG_ALMACEN: number;
}
