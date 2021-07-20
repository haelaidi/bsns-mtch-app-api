import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {OfferImageEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class OfferImageService extends CrudReadWriteService<OfferImageEntity> {
    constructor(
        @InjectRepository(OfferImageEntity)
        private readonly _repo: Repository<OfferImageEntity>,
    ) {
        super(_repo);
    }
}
