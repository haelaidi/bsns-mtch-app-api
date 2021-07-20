import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CrudEntity } from '../crud-entity/Crud.entity';
import { FunctionEntity } from './Function.entity';
import { SocietyEntity } from './Society.entity';
import { TypeUserEntity } from './TypeUser.entity';
import { CategoryEntity } from './Category.entity';
import { CurrencyEntity } from './Currency.entity';
import { CountryEntity } from './Country.entity';
import { DevisEntity } from './Devis.entity';
import { OfferEntity } from './Offer.entity';
import { ReviewEntity } from './Review.entity';
import { TypeOfferEntity } from './TypeOffer.entity';
import { SocietyCategoryEntity } from './SocietyCategory.entity';
import { StatusEntity } from './Status.entity';
import { CityEntity } from './City.entity';
import { ResponseEntity } from './Response.entity';
import { OfferImageEntity } from './OfferImage.entity';
import { ProductEntity } from './Product.entity';
import { UnitMeasureEntity } from './UnitMeasure.entity';

@Entity('t_user')
export class UserEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idtypeuser', nullable: false, comment: '' })
  idtypeuser: number;

  @Column({ name: 'idsociety', nullable: false, comment: '' })
  idsociety: number;

  @Column({ name: 'idfunction', nullable: true, comment: '' })
  idfunction: number;

  @Column({ name: 'pseudo', nullable: false, length: 10, comment: '' })
  pseudo: string;

  @Column({ name: 'firstname', nullable: false, length: 100, comment: '' })
  firstname: string;

  @Column({ name: 'lastname', nullable: false, length: 100, comment: '' })
  lastname: string;

  @Column({ name: 'email', nullable: false, length: 60, comment: '' })
  email: string;

  @Column({ name: 'phone', nullable: false, length: 20, comment: '' })
  phone: string;

  @Column({ name: 'password', nullable: false, length: 255, comment: '' })
  password: string;

  @Column({ name: 'enabled', nullable: true, default: () => false, comment: '' })
  enabled: boolean;

  @Column({ name: 'verified', nullable: true, default: () => false, comment: '' })
  verified: boolean;

  @Column({ name: 'verifiedat', nullable: true, comment: '' })
  verifiedat: Date;

  @Column({ name: 'imageurl', type: 'longtext', nullable: true, comment: '' })
  imageurl: string;

  @Column({ name: 'image', type: 'longblob', nullable: true, comment: '' })
  image: string;

  @Column({ name: 'verifiedhash', type: 'longtext', nullable: true, comment: '' })
  verifiedhash: string;

  @ManyToOne(() => UserEntity, (entity) => entity._user_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => FunctionEntity, (entity) => entity._users)
  @JoinColumn([{ name: 'idfunction', referencedColumnName: 'id' }])
  _function: FunctionEntity;

  @ManyToOne(() => SocietyEntity, (entity) => entity._users)
  @JoinColumn([{ name: 'idsociety', referencedColumnName: 'id' }])
  _society: SocietyEntity;

  @ManyToOne(() => TypeUserEntity, (entity) => entity._users)
  @JoinColumn([{ name: 'idtypeuser', referencedColumnName: 'id' }])
  _typeuser: TypeUserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._user_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;


  @ManyToOne(() => CountryEntity, (entity) => entity._users)
  @JoinColumn([{ name: 'idcountry', referencedColumnName: 'id' }])
  _country: CountryEntity;

  @OneToMany(() => CategoryEntity, (entity) => entity._createdby)
  _category_createds: CategoryEntity[];

  @OneToMany(() => CategoryEntity, (entity) => entity._updatedby)
  _category_updateds: CategoryEntity[];

  @OneToMany(() => CurrencyEntity, (entity) => entity._createdby)
  _typecurrency_createds: CurrencyEntity[];

  @OneToMany(() => CurrencyEntity, (entity) => entity._updatedby)
  _currency_updateds: CurrencyEntity[];

  @OneToMany(() => CountryEntity, (entity) => entity._createdby)
  _country_createds: CountryEntity[];

  @OneToMany(() => CountryEntity, (entity) => entity._updatedby)
  _country_updateds: CountryEntity[];

  @OneToMany(() => DevisEntity, (entity) => entity._buyer)
  _devis_buyers: DevisEntity[];

  @OneToMany(() => DevisEntity, (entity) => entity._seller)
  _devis_sellers: DevisEntity[];

  @OneToMany(() => DevisEntity, (entity) => entity._createdby)
  _devis_createds: DevisEntity[];

  @OneToMany(() => DevisEntity, (entity) => entity._updatedby)
  _devis_updateds: DevisEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._user)
  _offers: OfferEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._validatedby)
  _offer_validateds: OfferEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._createdby)
  _offer_createds: OfferEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._updatedby)
  _offer_updateds: OfferEntity[];

  @OneToMany(() => ReviewEntity, (entity) => entity._user)
  _reviews: ReviewEntity[];

  @OneToMany(() => ReviewEntity, (entity) => entity._createdby)
  _review_createds: ReviewEntity[];

  @OneToMany(() => ReviewEntity, (entity) => entity._updatedby)
  _review_updateds: ReviewEntity[];

  @OneToMany(() => UserEntity, (entity) => entity._createdby)
  _user_createds: UserEntity[];

  @OneToMany(() => UserEntity, (entity) => entity._updatedby)
  _user_updateds: UserEntity[];

  @OneToMany(() => TypeOfferEntity, (entity) => entity._createdby)
  _typeoffer_createds: TypeOfferEntity[];

  @OneToMany(() => TypeOfferEntity, (entity) => entity._updatedby)
  _typeoffer_updateds: TypeOfferEntity[];

  @OneToMany(() => SocietyCategoryEntity, (entity) => entity._createdby)
  _societycategory_createds: SocietyCategoryEntity[];

  @OneToMany(() => SocietyCategoryEntity, (entity) => entity._updatedby)
  _societycategory_updateds: SocietyCategoryEntity[];

  @OneToMany(() => StatusEntity, (entity) => entity._createdby)
  _status_createds: StatusEntity[];

  @OneToMany(() => StatusEntity, (entity) => entity._updatedby)
  _status_updateds: StatusEntity[];

  @OneToMany(() => TypeUserEntity, (entity) => entity._createdby)
  _typeuser_createds: TypeUserEntity[];

  @OneToMany(() => TypeUserEntity, (entity) => entity._updatedby)
  _typeuser_updateds: TypeUserEntity[];

  @OneToMany(() => CityEntity, (entity) => entity._createdby)
  _city_createds: CityEntity[];

  @OneToMany(() => CityEntity, (entity) => entity._updatedby)
  _city_updateds: CityEntity[];

  @OneToMany(() => FunctionEntity, (entity) => entity._createdby)
  _function_createds: FunctionEntity[];

  @OneToMany(() => FunctionEntity, (entity) => entity._updatedby)
  _function_updateds: FunctionEntity[];

  @OneToMany(() => SocietyEntity, (entity) => entity._createdby)
  _society_createds: SocietyEntity[];

  @OneToMany(() => SocietyEntity, (entity) => entity._updatedby)
  _society_updateds: SocietyEntity[];

  @OneToMany(() => ResponseEntity, (entity) => entity._updatedby)
  _responses: ResponseEntity[];

  @OneToMany(() => ResponseEntity, (entity) => entity._createdby)
  _response_createds: ResponseEntity[];

  @OneToMany(() => ResponseEntity, (entity) => entity._updatedby)
  _response_updateds: ResponseEntity[];

  @OneToMany(() => OfferImageEntity, (entity) => entity._createdby)
  _offerimage_createds: OfferImageEntity[];

  @OneToMany(() => OfferImageEntity, (entity) => entity._updatedby)
  _offerimage_updateds: OfferImageEntity[];

  @OneToMany(() => ProductEntity, (entity) => entity._createdby)
  _product_createds: ProductEntity[];

  @OneToMany(() => ProductEntity, (entity) => entity._updatedby)
  _product_updateds: ProductEntity[];

  @OneToMany(() => UnitMeasureEntity, (entity) => entity._createdby)
  _unitmeasure_createds: UnitMeasureEntity[];

  @OneToMany(() => UnitMeasureEntity, (entity) => entity._updatedby)
  _unitmeasure_updateds: UnitMeasureEntity[];
}
