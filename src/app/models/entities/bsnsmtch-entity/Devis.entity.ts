import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CrudEntity } from '../crud-entity/Crud.entity';
import { UserEntity } from './User.entity';
import { OfferEntity } from './Offer.entity';

@Entity('t_devis')
export class DevisEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idoffer', nullable: false, comment: '' })
  idoffer: number;

  @Column({ name: 'idbuyer', nullable: false, comment: '' })
  idbuyer: number;

  @Column({ name: 'idseller', nullable: false, comment: '' })
  idseller: number;

  @Column({ name: 'idstatus', nullable: true, comment: '' })
  idstatus: number;

  @Column({ type: 'numeric', name: 'quantity', precision: 18, scale: 4, nullable: true, comment: '' })
  quantity: number;

  @Column({ type: 'numeric', name: 'price', precision: 18, scale: 4, nullable: true, comment: '' })
  price: number;

  @Column({ type: 'numeric', name: 'amount', precision: 18, scale: 4, nullable: true, comment: '' })
  amount: number;

  @ManyToOne(() => UserEntity, (entity) => entity._devis_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._devis_buyers)
  @JoinColumn([{ name: 'idbuyer', referencedColumnName: 'id' }])
  _buyer: UserEntity;

  @ManyToOne(() => OfferEntity, (entity) => entity._deviss)
  @JoinColumn([{ name: 'idoffer', referencedColumnName: 'id' }])
  _offer: OfferEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._devis_sellers)
  @JoinColumn([{ name: 'idseller', referencedColumnName: 'id' }])
  _seller: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._devis_sellers)
  @JoinColumn([{ name: 'idstatus', referencedColumnName: 'id' }])
  _status: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._devis_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;
}