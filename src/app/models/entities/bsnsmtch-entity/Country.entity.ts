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
import { CurrencyEntity } from './Currency.entity';
import { CityEntity } from './City.entity';

@Entity('t_country')
export class CountryEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idcurrency', nullable: true, comment: '' })
  idcurrency: number;

  @Column({ name: 'codegsm', nullable: true, length: 10, comment: '' })
  codegsm: string;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @Column({ name: 'flag', nullable: false, length: 120, comment: '' })
  flag: string;

  @ManyToOne(() => UserEntity, (entity) => entity._country_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => CurrencyEntity, (entity) => entity._countrys)
  @JoinColumn([{ name: 'idcurrency', referencedColumnName: 'id' }])
  _currency: CurrencyEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._country_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => CityEntity, (entity) => entity._country)
  _citys: CityEntity[];

  @OneToMany(() => UserEntity, (entity) => entity._country)
  _users: UserEntity[];
}
