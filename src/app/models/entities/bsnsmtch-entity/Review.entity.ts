import {
  PrimaryColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CrudEntity } from '../crud-entity/Crud.entity';
import { UserEntity } from './User.entity';
import { OfferEntity } from './Offer.entity';

@Entity('t_review')
export class ReviewEntity extends CrudEntity {

  @PrimaryColumn({ name: 'idoffer', comment: '' })
  idoffer: number;

  @PrimaryColumn({ name: 'iduser', comment: '' })
  iduser: number;

  @Column({ name: 'comment', nullable: true, length: 255, comment: '' })
  comment: string;

  @Column({ name: 'rating', nullable: true, comment: '' })
  rating: number;

  @ManyToOne(() => UserEntity, (entity) => entity._review_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => OfferEntity, (entity) => entity._reviews)
  @JoinColumn([{ name: 'idoffer', referencedColumnName: 'id' }])
  _offer: OfferEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._reviews)
  @JoinColumn([{ name: 'iduser', referencedColumnName: 'id' }])
  _user: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._review_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;
}