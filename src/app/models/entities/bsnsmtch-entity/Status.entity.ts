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

@Entity('t_status')
export class StatusEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @ManyToOne(() => UserEntity, (entity) => entity._status_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._status_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => OfferEntity, (entity) => entity._status)
  _offers: OfferEntity[];
}