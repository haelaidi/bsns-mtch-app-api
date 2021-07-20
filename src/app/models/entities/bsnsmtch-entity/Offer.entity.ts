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
import { StatusEntity } from './Status.entity';
import { CurrencyEntity } from './Currency.entity';
import { TypeOfferEntity } from './TypeOffer.entity';
import { ReviewEntity } from './Review.entity';
import { DevisEntity } from './Devis.entity';
import { ResponseEntity } from './Response.entity';
import { OfferImageEntity } from './OfferImage.entity';
import { ProductEntity } from './Product.entity';
import { CityEntity } from './City.entity';
import { UnitMeasureEntity } from './UnitMeasure.entity';

@Entity('t_offer')
export class OfferEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idtypeoffer', nullable: false, comment: '' })
  idtypeoffer: number;

  @Column({ name: 'iduser', nullable: false, comment: '' })
  iduser: number;

  @Column({ name: 'idstatus', nullable: false, comment: '' })
  idstatus: number;

  @Column({ name: 'idcurrency', nullable: false, comment: '' })
  idcurrency: number;

  @Column({ name: 'idproduct', nullable: false, comment: '' })
  idproduct: number;

  @Column({ name: 'idcity', nullable: false, comment: '' })
  idcity: number;

  @Column({ name: 'idunitmeasure', nullable: false, comment: '' })
  idunitmeasure: number;

  @Column({ type: 'date', name: 'dateoffer', nullable: true, comment: '' })
  dateoffer: Date;

  @Column({ name: 'title', nullable: false, length: 120, comment: '' })
  title: string;

  @Column({ name: 'imageurl', nullable: true, length: 255, comment: '' })
  imageurl: string;

  @Column({ type: 'numeric', name: 'qantity_min', precision: 18, scale: 4, nullable: true, comment: '' })
  qantity_min: number;

  @Column({ type: 'numeric', name: 'price', precision: 18, scale: 4, nullable: true, comment: '' })
  price: number;

  @Column({ name: 'validatedby', nullable: true, comment: '' })
  validatedby: number;

  @Column({ name: 'validatedat', nullable: true, comment: '' })
  validatedat: Date;

  @ManyToOne(() => ProductEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idproduct', referencedColumnName: 'id' }])
  _product: ProductEntity;

  @ManyToOne(() => UnitMeasureEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idunitmeasure', referencedColumnName: 'id' }])
  _unitmeasure: UnitMeasureEntity;

  @ManyToOne(() => CityEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idcity', referencedColumnName: 'id' }])
  _city: ProductEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._offer_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => StatusEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idstatus', referencedColumnName: 'id' }])
  _status: StatusEntity;

  @ManyToOne(() => CurrencyEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idcurrency', referencedColumnName: 'id' }])
  _currency: CurrencyEntity;

  @ManyToOne(() => TypeOfferEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'idtypeoffer', referencedColumnName: 'id' }])
  _typeoffer: TypeOfferEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._offers)
  @JoinColumn([{ name: 'iduser', referencedColumnName: 'id' }])
  _user: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._offer_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._offer_validateds)
  @JoinColumn([{ name: 'validatedby', referencedColumnName: 'id' }])
  _validatedby: UserEntity;

  @OneToMany(() => ReviewEntity, (entity) => entity._offer)
  _reviews: ReviewEntity[];

  @OneToMany(() => DevisEntity, (entity) => entity._offer)
  _deviss: DevisEntity[];

  @OneToMany(() => ResponseEntity, (entity) => entity._offer)
  _responses: ResponseEntity[];

  @OneToMany(() => OfferImageEntity, (entity) => entity._offer, {cascade: true})
  _offerimages: OfferImageEntity[];
}
