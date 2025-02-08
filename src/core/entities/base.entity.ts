import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
