import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SaveOptions} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {OfferEntity} from '../../models/entities/bsnsmtch-entity';
import {ProductService} from './Product.service';

@Injectable()
export class OfferService extends CrudReadWriteService<OfferEntity> {
    constructor(
        @InjectRepository(OfferEntity)
        private readonly _repo: Repository<OfferEntity>,
        private readonly _serviceProduct: ProductService,
    ) {
        super(_repo);
    }

    async _findByFilter(options: any): Promise<[any, number]> {
        try {
            if (options.where['idtypeoffer']) {
                options.where['t1.idtypeoffer'] = options.where['idtypeoffer'];
                delete options.where['idtypeoffer'];
            }
            if (options.where['iduser']) {
                options.where['t1.iduser'] = options.where['iduser'];
                delete options.where['iduser'];
            }
            if (options.where['idcategory']) {
                options.where['t5.idcategory'] = options.where['idcategory'];
                delete options.where['idcategory'];
            }
            if (options.where['idcountry']) {
                options.where['t8.id'] = options.where['idcountry'];
                delete options.where['idcountry'];
            }
            if (options.where['idcity']) {
                options.where['t7.id'] = options.where['idcity'];
                delete options.where['idcity'];
            }
            return await this._repo.createQueryBuilder('t1')
                .distinct()
                .select([
                    't1.id', 't1.idstatus', 't1.dateoffer', 't1.title', 't1.qantity_min', 't1.price', 't1.description',
                    't2.label',
                    't3.id', 't3.firstname', 't3.lastname',
                    't4.label',
                    't6.label',
                    't7.label',
                    't8.codegsm', 't8.label', 't8.flag',
                    't9.label', 't9.symbol',
                    't10.imageurl', 't10.image', 't10.order',
                    't11.label', 't11.symbol',
                    't12.iduser', 't12.rating',
                ])
                .innerJoin('t1._typeoffer', 't2')
                .innerJoin('t1._user', 't3')
                .innerJoin('t3._society', 't4')
                .innerJoin('t4._societycategorys', 't5')
                .innerJoin('t1._status', 't6')
                .innerJoin('t1._city', 't7')
                .innerJoin('t7._country', 't8')
                .innerJoin('t1._currency', 't9')
                .leftJoin('t1._offerimages', 't10', 't10.order=1')
                .leftJoin('t1._unitmeasure', 't11')
                .leftJoin('t1._reviews', 't12')
                .where(Object.keys(options.where).map(function (k) {
                    return `${k}=${options.where[k]}`;
                }).join(' and '))
                .take(options.take)
                .skip(options.skip)
                .orderBy('t1.id', 'DESC')
                .getManyAndCount();
        } catch (err) {
            throw  new Error(err);
        }
    }

    async _findById(id: number): Promise<OfferEntity> {
        try {
            return await this._repo.createQueryBuilder('t1')
                .select([
                    't1.id', 't1.idstatus', 't1.dateoffer', 't1.title', 't1.qantity_min', 't1.price', 't1.description',
                    't2.label',
                    't3.firstname', 't3.lastname',
                    't4.label',
                    't5.label',
                    't6.codegsm', 't6.label', 't6.flag',
                    't7.label', 't7.symbol',
                    't8.imageurl', 't8.image', 't8.order',
                    't9.comment', 't9.rating', 't9.createdat',
                    't10.id', 't10.firstname', 't10.lastname',
                    't11.comment',
                    't12.id', 't12.firstname', 't12.lastname',
                    't13.comment',
                    't14.firstname', 't14.lastname',
                    't15.label', 't15.symbol',
                ])
                .innerJoin('t1._typeoffer', 't2')
                .innerJoin('t1._user', 't3')
                .innerJoin('t1._status', 't4')
                .innerJoin('t1._city', 't5')
                .innerJoin('t5._country', 't6')
                .innerJoin('t1._currency', 't7')
                .leftJoin('t1._offerimages', 't8')
                .leftJoin('t1._reviews', 't9')
                .leftJoin('t9._user', 't10')
                .leftJoin('t1._responses', 't11')
                .leftJoin('t11._user', 't12')
                .leftJoin('t11._response', 't13')
                .leftJoin('t11._user', 't14')
                .leftJoin('t1._unitmeasure', 't15')
                .where({id: id})
                .getOne();
        } catch (err) {
            throw  new Error(err);
        }

    }

    async _upsert(entities: any, options?: SaveOptions): Promise<[(OfferEntity[] | OfferEntity), number]> {
        let nbr: number;
        let product: any = await this._serviceProduct._findOne({label: entities.title});
        if (!product)
            [product, nbr] = await this._serviceProduct._upsert({label: entities.title, createdby: entities.createdby});

        entities.dateoffer = new Date();
        entities.idstatus = 1;
        entities.iduser = entities.createdby;
        entities.idproduct = product.id;

        return super._upsert(entities, options);
    }
}
