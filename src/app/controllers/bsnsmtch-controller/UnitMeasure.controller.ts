import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {UnitMeasureEntity} from '../../models/entities/bsnsmtch-entity';
import {UnitMeasureService} from '../../services/bsnsmtch-service';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {
    CreateUnitMeasureDto, DeleteUnitMeasureDto,
    UnitMeasureDto,
    UpdateUnitMeasureDto,
} from '../../models/dtos/bsnsmtch-dto/UnitMeasure-dto';

//@UseGuards(JwtAuthGuard)
@ApiTags('Unit Measure')
@Controller('unitmeasure')
export class UnitMeasureController extends CrudReadWriteController<UnitMeasureEntity, UnitMeasureDto, CreateUnitMeasureDto, UpdateUnitMeasureDto, DeleteUnitMeasureDto> {
    constructor(private readonly _serviceCategory: UnitMeasureService) {
        super(_serviceCategory, UnitMeasureDto, CreateUnitMeasureDto, UpdateUnitMeasureDto, DeleteUnitMeasureDto);
    }
}
