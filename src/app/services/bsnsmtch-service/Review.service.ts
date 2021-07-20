import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {CrudReadWriteService} from "../crud-service";
import {ReviewEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class ReviewService extends CrudReadWriteService<ReviewEntity> {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly _repo: Repository<ReviewEntity>,
    ) {
        super(_repo);
    }
}
