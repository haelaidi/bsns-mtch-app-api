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

@Entity('t_response')
export class ResponseEntity extends CrudEntity {

  @PrimaryGeneratedColumn('increment', { name: 'id', comment: '' })
  id: number;

  @Column({ name: 'idparent', nullable: true, comment: '' })
  idparent: number;

  @Column({ name: 'idoffer', nullable: true, comment: '' })
  idoffer: number;

  @Column({ name: 'iduser', nullable: true, comment: '' })
  iduser: number;

  @Column({ name: 'comment', nullable: true, length: -1, comment: '' })
  comment: string;

  @ManyToOne(() => UserEntity, (entity) => entity._response_createds)
  @JoinColumn([{ name: 'createdby', referencedColumnName: 'id' }])
  _createdby: UserEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._response_updateds)
  @JoinColumn([{ name: 'updatedby', referencedColumnName: 'id' }])
  _updatedby: UserEntity;

  @ManyToOne(() => OfferEntity, (entity) => entity._responses)
  @JoinColumn([{ name: 'idoffer', referencedColumnName: 'id' }])
  _offer: OfferEntity;

  @ManyToOne(() => ResponseEntity, (entity) => entity._responses)
  @JoinColumn([{ name: 'idparent', referencedColumnName: 'id' }])
  _response: ResponseEntity;

  @ManyToOne(() => UserEntity, (entity) => entity._responses)
  @JoinColumn([{ name: 'iduser', referencedColumnName: 'id' }])
  _user: UserEntity;

  @OneToMany(() => ResponseEntity, (entity) => entity._response)
  _responses: ResponseEntity[];
}
