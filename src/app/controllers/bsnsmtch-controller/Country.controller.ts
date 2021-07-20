import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {CountryService} from '../../services/bsnsmtch-service';
import {
    CountryDto,
    CreateCountryDto,
    UpdateCountryDto,
    DeleteCountryDto,
} from '../../models/dtos/bsnsmtch-dto';
import {CountryEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Country')
@Controller('country')
export class CountryController extends CrudReadWriteController<CountryEntity, CountryDto, CreateCountryDto, UpdateCountryDto, DeleteCountryDto> {
    constructor(private readonly _serviceCountry: CountryService) {
        super(_serviceCountry, CountryDto, CreateCountryDto, UpdateCountryDto, DeleteCountryDto);
    }
}
