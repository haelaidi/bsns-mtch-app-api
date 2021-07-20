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
import { OfferEntity } from './Offer.entity';

@Entity('t_unit_measure')
export class UnitMeasureEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @Column({ name: 'symbol', nullable: false, length: 20, comment: '' })
  symbol: string;

  @ManyToOne(() => UserEntity, (entity) => entity._unitmeasure_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._unitmeasure_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => OfferEntity, (entity) => entity._unitmeasure)
  _offers: OfferEntity[];
}
