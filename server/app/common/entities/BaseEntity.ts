import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  updaatedAt: Date | null;

  @DeleteDateColumn({ type: 'datetime' })
  deleteDate: Date | null;
}
