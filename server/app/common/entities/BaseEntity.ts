import { Column } from "typeorm";

export class BaseEntity {
  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updaatedAt: Date | null;
}