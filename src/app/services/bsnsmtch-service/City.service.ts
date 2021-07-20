import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {CityEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class CityService extends CrudReadWriteService<CityEntity> {
    constructor(
        @InjectRepository(CityEntity)
        private readonly _repo: Repository<CityEntity>,
    ) {
        super(_repo);
    }
}
