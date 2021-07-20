import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {CountryEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class CountryService extends CrudReadWriteService<CountryEntity> {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly _repo: Repository<CountryEntity>,
    ) {
        super(_repo);
    }
}
