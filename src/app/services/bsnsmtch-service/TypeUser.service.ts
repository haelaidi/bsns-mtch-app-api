import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {TypeUserEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class TypeUserService extends CrudReadWriteService<TypeUserEntity> {
    constructor(
        @InjectRepository(TypeUserEntity)
        private readonly _repo: Repository<TypeUserEntity>,
    ) {
        super(_repo);
    }
}
