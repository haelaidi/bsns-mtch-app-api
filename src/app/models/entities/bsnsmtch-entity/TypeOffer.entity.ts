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
import { OfferEntity } from './Offer.entity';

@Entity('t_type_offer')
export class TypeOfferEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @ManyToOne(() => UserEntity, (entity) => entity._typeoffer_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._typeoffer_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => OfferEntity, (entity) => entity._typeoffer)
  _offers: OfferEntity[];
}