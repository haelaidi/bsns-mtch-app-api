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
import { SocietyEntity } from './Society.entity';
import { OfferEntity } from './Offer.entity';

@Entity('t_city')
export class CityEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idcountry', nullable: false, comment: '' })
  idcountry: number;

  @Column({ name: 'codepostal', nullable: true, length: 10, comment: '' })
  codepostal: string;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @ManyToOne(() => UserEntity, (entity) => entity._city_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => CountryEntity, (entity) => entity._citys)
  @JoinColumn([{ name: 'idcountry', referencedColumnName: 'id' }])
  _country: CountryEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._city_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => SocietyEntity, (entity) => entity._city)
  _societys: SocietyEntity[];

  @OneToMany(() => OfferEntity, (entity) => entity._city)
  _offers: SocietyEntity[];
}
