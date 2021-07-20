import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {CurrencyEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class CurrencyService extends CrudReadWriteService<CurrencyEntity> {
    constructor(
        @InjectRepository(CurrencyEntity)
        private readonly _repo: Repository<CurrencyEntity>,
    ) {
        super(_repo);
    }

}
