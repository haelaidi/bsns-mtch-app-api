import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {StatusService} from '../../services/bsnsmtch-service';
import {
    StatusDto,
    CreateStatusDto,
    UpdateStatusDto,
    DeleteStatusDto,
} from '../../models/dtos/bsnsmtch-dto';
import {StatusEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Status')
@Controller('status')
export class StatusController extends CrudReadWriteController<StatusEntity, StatusDto, CreateStatusDto, UpdateStatusDto, DeleteStatusDto> {
    constructor(private readonly _serviceStatus: StatusService) {
        super(_serviceStatus, StatusDto, CreateStatusDto, UpdateStatusDto, DeleteStatusDto);
    }
}
