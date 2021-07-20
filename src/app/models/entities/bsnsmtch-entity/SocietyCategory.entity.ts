import {
  PrimaryColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CrudEntity } from '../crud-entity/Crud.entity';
import { UserEntity } from './User.entity';
import { CategoryEntity } from './Category.entity';
import { SocietyEntity } from './Society.entity';

@Entity('t_society_category')
export class SocietyCategoryEntity extends CrudEntity {

  @PrimaryColumn({ name: 'idsociety', comment: '' })
  idsociety: number;

  @PrimaryColumn({ name: 'idcategory', comment: '' })
  idcategory: number;

  @ManyToOne(() => UserEntity, (entity) => entity._societycategory_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => CategoryEntity, (entity) => entity._societycategorys)
  @JoinColumn([{ name: 'idcategory', referencedColumnName: 'id' }])
  _category: CategoryEntity;

  @ManyToOne(() => SocietyEntity, (entity) => entity._societycategorys)
  @JoinColumn([{ name: 'idsociety', referencedColumnName: 'id' }])
  _society: SocietyEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._societycategory_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;
}