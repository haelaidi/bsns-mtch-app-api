import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudReadWriteService} from '../crud-service';
import {CategoryEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class CategoryService extends CrudReadWriteService<CategoryEntity> {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly _repo: Repository<CategoryEntity>,
    ) {
        super(_repo);
    }
}
