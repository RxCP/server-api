import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp' })
  updaatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp' })
  deleteDate: Date;
}
