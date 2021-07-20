import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {CrudReadWriteService} from "../crud-service";
import {SocietyCategoryEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class SocietyCategoryService extends CrudReadWriteService<SocietyCategoryEntity> {
    constructor(
        @InjectRepository(SocietyCategoryEntity)
        private readonly _repo: Repository<SocietyCategoryEntity>,
    ) {
        super(_repo);
    }
}
