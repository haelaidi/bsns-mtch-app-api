import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindConditions, FindManyOptions, Repository} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {ProductEntity} from '../../models/entities/bsnsmtch-entity';

@Injectable()
export class ProductService extends CrudReadWriteService<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly _repo: Repository<ProductEntity>,
    ) {
        super(_repo);
    }

    /**
     * Finds entities that match given id category
     * @param options
     */
    async _findByCategory(id: number): Promise<[ProductEntity[], number]> {
        return await this._repo.createQueryBuilder('t1')
            .distinct()
            .select(['t1'])
            .innerJoin('t1._offers', 't2')
            .innerJoin('t2._user', 't3')
            .innerJoin('t3._society', 't4')
            .innerJoin('t4._societycategorys', 't5')
            .where('t5.idcategory=:idcategory', {idcategory: id})
            .getManyAndCount();
    };
}
