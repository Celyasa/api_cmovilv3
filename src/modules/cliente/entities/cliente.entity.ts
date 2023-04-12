import { Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('CLIENTE_PK', ['cliCodigo'], { unique: true })
@Entity('CLIENTE', { schema: 'DATA_USR' })
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'CLI_CODIGO' })
  cliCodigo: number;
}
