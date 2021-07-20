import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {CurrencyService} from '../../services/bsnsmtch-service';
import {
    CurrencyDto,
    CreateCurrencyDto,
    UpdateCurrencyDto,
    DeleteCurrencyDto,
} from '../../models/dtos/bsnsmtch-dto';
import {CurrencyEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('TypeCurrency')
@Controller('typecurrency')
export class CurrencyController extends CrudReadWriteController<CurrencyEntity, CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto, DeleteCurrencyDto> {
    constructor(private readonly _serviceTypeCurrency: CurrencyService) {
        super(_serviceTypeCurrency, CurrencyDto, CreateCurrencyDto, UpdateCurrencyDto, DeleteCurrencyDto);
    }
}
