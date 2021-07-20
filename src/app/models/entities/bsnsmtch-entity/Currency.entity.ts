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
import { CountryEntity } from './Country.entity';
import { OfferEntity } from './Offer.entity';

@Entity('t_currency')
export class CurrencyEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @Column({ name: 'symbol', nullable: false, length: 20, comment: '' })
  symbol : string;

  @ManyToOne(() => UserEntity, (entity) => entity._typecurrency_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._currency_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => CountryEntity, (entity) => entity._currency)
  _countrys: CountryEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._currency)
  _offers: OfferEntity[];
}
