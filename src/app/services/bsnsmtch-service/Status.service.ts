import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {StatusEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class StatusService extends CrudReadWriteService<StatusEntity> {
    constructor(
        @InjectRepository(StatusEntity)
        private readonly _repo: Repository<StatusEntity>,
    ) {
        super(_repo);
    }
}
