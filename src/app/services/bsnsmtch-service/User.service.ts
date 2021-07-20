import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SaveOptions} from 'typeorm';
import {CrudReadWriteService} from '../crud-service';
import {UserEntity} from '../../models/entities/bsnsmtch-entity';
import {SocietyService} from './Society.service';
import {SocietyCategoryService} from './SocietyCategory.service';
import {hashPassword} from '../../../utils/password';

@Injectable()
export class UserService extends CrudReadWriteService<UserEntity> {

    constructor(
        @InjectRepository(UserEntity)
        private readonly _repo: Repository<UserEntity>,
        private _serviceSociety: SocietyService,
        private _serviceSocietyCategory: SocietyCategoryService,
    ) {
        super(_repo);
    }

    async _findInfoByEmail(email: string): Promise<UserEntity> {
        try {
            return await this._repo.createQueryBuilder('t1')
                .select([
                    't1.id', 't1.idtypeuser', 't1.idsociety', 't1.idcountry', 't1.email', 't1.firstname', 't1.lastname', 't1.phone', 't1.password', 't1.verified',
                    't1.enabled', 't1.createdby', 't1.updatedby', 't1.createdat', 't1.updatedat', 't1.rowversion',
                    't2.label',
                    't3.label',
                    't4.codegsm', 't4.label',
                ])
                .innerJoin('t1._typeuser', 't2')
                .innerJoin('t1._society', 't3')
                .innerJoin('t1._country', 't4')
                .where({email: email})
                .getOne();
        } catch (e) {
            throw new Error(e);
        }

    }


    async _singup(entities: any, options?: SaveOptions): Promise<[(UserEntity[] | UserEntity), number]> {
        let nbr: number = 0;
        let user: any = null;
        let society: any = await this._serviceSociety._findOne({label: entities.raison_social});
        if (!society)
            [society, nbr] = await this._serviceSociety._upsert({label: entities.raison_social});
        let categotySociete: any = await this._serviceSocietyCategory._findOne({
            idsociety: society.id,
            idcategory: entities.idcategory,
        });
        if (!categotySociete)
            [categotySociete, nbr] = await this._serviceSocietyCategory._upsert({
                idsociety: society.id,
                idcategory: entities.idcategory,
            });
        const userEntity = {
            idsociety: society.id,
            idfunction: entities.idfunction,
            idtypeuser: entities.idtypeuser,
            email: entities.email,
            firstname: entities.firstname,
            lastname: entities.lastname,
            password: await hashPassword(entities.password),
            phone: entities.phone,
        };
        [user, nbr] = await super._upsert(userEntity);
        if (!society.createdby)
            await this._serviceSociety._upsert({id: society.id, createdby: user.id});
        await this._serviceSocietyCategory._upsert({
            idsociety: society.id,
            idcategory: entities.idcategory,
            createdby: user.id,
        });
        await super._upsert({id: user.id, createdby: user.id});
        return [await super._findOne({id: user.id}), 1];
    }

    async _findCurrencyByUser(iduser: number): Promise<Number> {
        const user = await this._repo.createQueryBuilder('t1')
            .select([
                't1.id', 't2.id', 't2.label', 't3.id', 't3.label',
            ])
            .innerJoin('t1._country', 't2')
            .innerJoin('t2._currency', 't3')
            .getOne();
        // default curreny id: 95 MAD
        const idcurreny: any = user._country._currency ? user._country._currency.id : 95;
        return idcurreny;
    }

}
