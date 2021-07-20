import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {SocietyEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class SocietyService extends CrudReadWriteService<SocietyEntity> {
    constructor(
        @InjectRepository(SocietyEntity)
        private readonly _repo: Repository<SocietyEntity>,
    ) {
        super(_repo);
    }
}
