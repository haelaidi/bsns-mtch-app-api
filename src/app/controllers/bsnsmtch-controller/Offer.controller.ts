import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Req,
    Res,
    UploadedFiles,
    HttpStatus,
    UseInterceptors,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {OfferService, UserService} from '../../services/bsnsmtch-service';
import {
    OfferDto,
    CreateOfferDto,
    UpdateOfferDto,
    DeleteOfferDto, OfferSearchDto,
} from '../../models/dtos/bsnsmtch-dto';
import {OfferEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {IApiResponse} from "../../../common/helpers/api-response/api-response.interface";
import {storage} from "../../../config/configuration";

@UseGuards(JwtAuthGuard)
@ApiTags('Offer')
@Controller('offer')
export class OfferController extends CrudReadWriteController<OfferEntity, OfferDto, CreateOfferDto, UpdateOfferDto, DeleteOfferDto> {
    constructor(private readonly _serviceOffer: OfferService, private _serviceUser: UserService) {
        super(_serviceOffer, OfferDto, CreateOfferDto, UpdateOfferDto, DeleteOfferDto);
    }

    @Post('edit')
    @UseInterceptors(AnyFilesInterceptor({storage: storage()}))
    async _edit(@Req() request: any, @Res() response: any, @UploadedFiles() files: Array<Express.Multer.File>): Promise<IApiResponse> {
        try {
            let _offerimages: any[] = [];
            const {user} = request;
            const {body} = request;
            if (!files) {
                await this._onError('No file exsiting', new Error('No file exsiting'), HttpStatus.BAD_REQUEST);
                return await this.send(response);
            }
            for (let i = 0; i < files.length; i++) {
                _offerimages.push({
                    imageurl: files[i].filename,
                    createdby: user.user.id,
                    updatedby: body['id'] > 0 ? user.user.id : null,
                    order: i + 1,
                });
            }
            body['_offerimages'] = _offerimages;
            const [entityDto, message]: any = await this._onTransformAndValidate(OfferDto, body);
            if (!entityDto) {
                await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
            } else {
                if (entityDto['id'] > 0) {
                    entityDto['updatedby'] = user.user.id;
                } else {
                    entityDto['createdby'] = user.user.id;
                    entityDto['idstatus'] = 1;
                    entityDto['iduser'] = user.user.id;
                    entityDto['idcurrency'] = await this._serviceUser._findCurrencyByUser(user.user.id);
                    entityDto['dateoffer'] = new Date();
                    delete entityDto['id'];
                }
                const [offer, count]: any = await this._serviceOffer._upsert(entityDto);
                await this._onSuccess(offer, count);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @Get('filter')
    async _findByFilter(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
        try {
            const {query} = request;
            const [entityDto, message]: any = await this._onTransformAndValidate(OfferSearchDto, query);
            if (!entityDto) {
                await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
            } else {
                const paginations: any = this._onParamsPagination(query);
                const options: any = {where: entityDto, ...paginations};
                const [data, count] = await this._serviceOffer._findByFilter(options);
                await this._onSuccess(data, count);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @Get('user/:idtypeoffer')
    async _findByUser(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
        try {
            const {query} = request;
            const {idtypeoffer} = request.params;
            const {user} = request.user;
            if (!idtypeoffer || !user) {
                await this._onError('Params invalide !', new Error('Params invalide !'), HttpStatus.BAD_REQUEST);
            } else {
                const paginations: any = this._onParamsPagination(query);
                const options: any = {where: {idtypeoffer: idtypeoffer, iduser: user.id}, ...paginations};
                const [data, count] = await this._serviceOffer._findByFilter(options);
                await this._onSuccess(data, count);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @Get('id/:id')
    async _findById(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
        try {
            const {id} = request.params;
            if (!id) {
                await this._onError('Params requirs', new Error('Params requirs'), HttpStatus.BAD_REQUEST);
            } else {
                const data = await this._serviceOffer._findById(id);
                await this._onSuccess(data, data ? 1 : 0);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

}
