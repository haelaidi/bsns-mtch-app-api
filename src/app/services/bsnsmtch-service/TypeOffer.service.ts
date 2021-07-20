import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {CrudReadWriteService} from "../crud-service";
import {TypeOfferEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class TypeOfferService extends CrudReadWriteService<TypeOfferEntity> {
    constructor(
        @InjectRepository(TypeOfferEntity)
        private readonly _repo: Repository<TypeOfferEntity>,
    ) {
        super(_repo);
    }
}
