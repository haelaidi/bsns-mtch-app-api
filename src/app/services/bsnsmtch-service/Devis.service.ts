import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {DevisEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class DevisService extends CrudReadWriteService<DevisEntity> {
    constructor(
        @InjectRepository(DevisEntity)
        private readonly _repo: Repository<DevisEntity>,
    ) {
        super(_repo);
    }
}
