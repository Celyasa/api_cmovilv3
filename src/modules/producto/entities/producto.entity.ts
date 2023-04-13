import { Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('PRODUCTO_PK', ['proCodigo'], { unique: true })
@Entity('PRODUCTO', { schema: 'DATA_USR' })
export class Producto {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'PRO_CODIGO' })
  proCodigo: number;
}
