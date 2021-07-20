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

@Entity('t_offer_image')
export class OfferImageEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idoffer', nullable: true, comment: '' })
  idoffer: number;

  @Column({ name: 'imageurl', type: 'longtext', nullable: true, comment: '' })
  imageurl: string;

  @Column({ name: 'image', type: 'longblob', nullable: true, comment: '' })
  image: string;

  @Column({ name: 'order', nullable: true, default: () => 1, comment: '' })
  order: number;

  @ManyToOne(() => UserEntity, (entity) => entity._offerimage_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._offerimage_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @ManyToOne(() => OfferEntity, (entity) => entity._offerimages)
  @JoinColumn([{ name: 'idoffer', referencedColumnName: 'id' }])
  _offer: OfferEntity;
}
