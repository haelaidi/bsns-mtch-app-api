import {Controller, Get, Post, Body, Param, UseGuards, Req, Res, HttpStatus} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {ResponseService} from '../../services/bsnsmtch-service';
import {
    ResponseDto,
    CreateResponseDto,
    UpdateResponseDto,
    DeleteResponseDto,
} from '../../models/dtos/bsnsmtch-dto';
import {ResponseEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {IApiResponse} from "../../../common/helpers/api-response/api-response.interface";

@UseGuards(JwtAuthGuard)
@ApiTags('Response')
@Controller('response')
export class ResponseController extends CrudReadWriteController<ResponseEntity, ResponseDto, CreateResponseDto, UpdateResponseDto, DeleteResponseDto> {
    constructor(private readonly _serviceResponse: ResponseService) {
        super(_serviceResponse, ResponseDto, CreateResponseDto, UpdateResponseDto, DeleteResponseDto);
    }

    @Get('detail/:idoffer')
    async _findByOffer(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
        try {
            const {query} = request;
            const {idoffer} = request.params;
            if (!idoffer) {
                await this._onError('Params invalide !', new Error('Params invalide !'), HttpStatus.BAD_REQUEST);
            } else {
                const paginations: any = this._onParamsPagination(query);
                const options: any = {where: {idoffer: idoffer}, ...paginations};
                const [data, count] = await this._serviceResponse._findByOffer(options);
                await this._onSuccess(data, count);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }

    @Post('upsert')
    async _upsert(request: any, response: any): Promise<IApiResponse> {
        const {user} = request;
        request.body['iduser'] = user.user.id;
        return super._upsert(request, response);
    }

}
