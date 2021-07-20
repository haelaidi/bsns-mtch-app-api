import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CrudEntity } from '../crud-entity/Crud.entity';
import { UserEntity } from './User.entity';
import { SocietyCategoryEntity } from './SocietyCategory.entity';

@Entity('t_category')
export class CategoryEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idparent', nullable: true, comment: '' })
  idparent: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @ManyToOne(() => UserEntity, (entity) => entity._category_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => CategoryEntity, (entity) => entity._categorys)
  @JoinColumn([{ name: 'idparent', referencedColumnName: 'id' }])
  _category: CategoryEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._category_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => CategoryEntity, (entity) => entity._category)
  _categorys: CategoryEntity[];

  @OneToMany(() => SocietyCategoryEntity, (entity) => entity._category)
  _societycategorys: SocietyCategoryEntity[];
}