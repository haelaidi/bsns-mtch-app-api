import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {CityService} from '../../services/bsnsmtch-service';
import {
    CityDto,
    CreateCityDto,
    UpdateCityDto,
    DeleteCityDto,
} from '../../models/dtos/bsnsmtch-dto';
import {CityEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('City')
@Controller('city')
export class CityController extends CrudReadWriteController<CityEntity, CityDto, CreateCityDto, UpdateCityDto, DeleteCityDto> {
    constructor(private readonly _serviceCity: CityService) {
        super(_serviceCity, CityDto, CreateCityDto, UpdateCityDto, DeleteCityDto);
    }
}
