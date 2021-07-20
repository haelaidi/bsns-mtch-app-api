import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {ResponseEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class ResponseService extends CrudReadWriteService<ResponseEntity> {
    constructor(
        @InjectRepository(ResponseEntity)
        private readonly _repo: Repository<ResponseEntity>,
    ) {
        super(_repo);
    }

    async _findByOffer(options: any): Promise<[ResponseEntity[], number]> {
        return this._repo.createQueryBuilder('t1')
            .select([
                't1.id', 't1.idparent', 't1.idoffer', 't1.comment', 't1.createdat',
                't2.id', 't2.firstname', 't2.lastname',
                't3.id', 't3.idparent', 't3.idoffer', 't3.comment', 't3.createdat',
                't4.id', 't4.firstname', 't4.lastname',
            ])
            .innerJoin('t1._user', 't2')
            .leftJoin('t1._responses', 't3')
            .leftJoin('t3._user', 't4')
            .where(options.where)
            .andWhere('t1.idparent is null')
            .take(options.take)
            .skip(options.skip)
            .getManyAndCount();
    }
}
