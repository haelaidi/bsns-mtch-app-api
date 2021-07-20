import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {FunctionEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class FunctionService extends CrudReadWriteService<FunctionEntity> {
    constructor(
        @InjectRepository(FunctionEntity)
        private readonly _repo: Repository<FunctionEntity>,
    ) {
        super(_repo);
    }
}
