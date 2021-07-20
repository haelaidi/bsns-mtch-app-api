import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudReadWriteService} from '../crud-service';
import {UnitMeasureEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class UnitMeasureService extends CrudReadWriteService<UnitMeasureEntity> {
    constructor(
        @InjectRepository(UnitMeasureEntity)
        private readonly _repo: Repository<UnitMeasureEntity>,
    ) {
        super(_repo);
    }
}
