import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('UK_USRCMOVIL', ['ucmId'], { unique: true })
@Entity('USRCMOVIL', { schema: 'DATA_USR' })
export class Usrcmovil {
  @PrimaryColumn({ type: 'varchar2', name: 'UCM_ID' })
  ucmId: string;

  @Column('varchar2', { name: 'UCM_PATH_IMG' })
  ucmPathImg: string;

  @Column('integer', { name: 'UCM_PORCENTAJE_RENTA' })
  ucmPorcentajeRenta: number;

  @Column('varchar2', { name: 'UCM_SERVIDOR' })
  ucmServidor: string;

  @Column('integer', { name: 'UCM_DESBLOQUEO' })
  ucmDesbloqueo: number;

  @Column('integer', { name: 'UCM_CLIENTE' })
  ucmCliente: number;

  @Column('varchar2', { name: 'UCM_PATH_CATALOG' })
  ucmPathCatalog: string;

  @Column('integer', { name: 'UCM_CONFIGURA' })
  ucmConfigura: number;

  @Column('integer', { name: 'UCM_TOKEN' })
  ucmToken: number;

  @Column('integer', { name: 'UCM_EMPRESA' })
  ucmEmpresa: number;

  @Column('integer', { name: 'UCM_CODIGO' })
  ucmCodigo: number;

  @Column('varchar2', { name: 'UCM_CLAVE' })
  ucmClave: string;

  @Column('varchar2', { name: 'UCM_NOMBRE' })
  ucmNombre: string;

  @Column('varchar2', { name: 'UCM_VERSION' })
  ucmVersion: string;

  @Column('integer', { name: 'UCM_AGE_CODIGO' })
  ucmAgeCodigo: number;

  @Column('integer', { name: 'UCM_ALM_CODIGO' })
  ucmAlmCodigo: number;

  @Column('varchar2', { name: 'UCM_ALM_NOMBRE' })
  ucmAlmNombre: string;

  @Column('varchar2', { name: 'UCM_NUEVAVERSION' })
  ucmNuevaVersion: string;

  @Column('varchar2', { name: 'UCM_PATH' })
  ucmPath: string;
}
