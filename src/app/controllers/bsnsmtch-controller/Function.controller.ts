import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {FunctionService} from '../../services/bsnsmtch-service';
import {
    FunctionDto,
    CreateFunctionDto,
    UpdateFunctionDto,
    DeleteFunctionDto,
} from '../../models/dtos/bsnsmtch-dto';
import {FunctionEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Function')
@Controller('function')
export class FunctionController extends CrudReadWriteController<FunctionEntity, FunctionDto, CreateFunctionDto, UpdateFunctionDto, DeleteFunctionDto> {
    constructor(private readonly _serviceFunction: FunctionService) {
        super(_serviceFunction, FunctionDto, CreateFunctionDto, UpdateFunctionDto, DeleteFunctionDto);
    }
}
