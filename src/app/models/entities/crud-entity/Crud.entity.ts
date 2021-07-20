import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Entity,
  BaseEntity,
} from 'typeorm';

@Entity()
export class CrudEntity extends BaseEntity {

  @Column({ name: 'createdby', nullable: true, comment: '' })
  createdby: number;

  @Column({ name: 'updatedby', nullable: true, comment: '' })
  updatedby: number;

  @CreateDateColumn({ name: 'createdat', nullable: false, update: false, comment: '' })
  createdat: Date;

  @UpdateDateColumn({ name: 'updatedat', nullable: false, comment: '' })
  updatedat: Date;

  @Column({ name: 'description', nullable: true, length: 160, comment: '' })
  description: string;

  @VersionColumn({ name: 'rowversion', nullable: true, comment: '', default: 1 })
  rowversion: number;

}
