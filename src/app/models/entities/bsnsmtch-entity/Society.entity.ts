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
import { CityEntity } from './City.entity';
import { SocietyCategoryEntity } from './SocietyCategory.entity';

@Entity('t_society')
export class SocietyEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idcity', nullable: true, comment: '' })
  idcity: number;

  @Column({ name: 'label', nullable: false, length: 60, comment: '' })
  label: string;

  @Column({ name: 'adress', nullable: true, length: 120, comment: '' })
  adress: string;

  @Column({ name: 'patente', nullable: true, length: 50, comment: '' })
  patente: string;

  @Column({ name: 'enabled', nullable: true, default: () => 0, comment: '' })
  enabled: boolean;

  @ManyToOne(() => UserEntity, (entity) => entity._society_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => CityEntity, (entity) => entity._societys)
  @JoinColumn([{ name: 'idcity', referencedColumnName: 'id' }])
  _city: CityEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._society_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @OneToMany(() => SocietyCategoryEntity, (entity) => entity._society)
  _societycategorys: SocietyCategoryEntity[];

  @OneToMany(() => UserEntity, (entity) => entity._society)
  _users: UserEntity[];
}