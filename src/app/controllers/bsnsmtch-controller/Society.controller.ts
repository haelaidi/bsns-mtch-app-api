import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {SocietyService} from '../../services/bsnsmtch-service';
import {
    SocietyDto,
    CreateSocietyDto,
    UpdateSocietyDto,
    DeleteSocietyDto,
} from '../../models/dtos/bsnsmtch-dto';
import {SocietyEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Society')
@Controller('society')
export class SocietyController extends CrudReadWriteController<SocietyEntity, SocietyDto, CreateSocietyDto, UpdateSocietyDto, DeleteSocietyDto> {
    constructor(private readonly _serviceSociety: SocietyService) {
        super(_serviceSociety, SocietyDto, CreateSocietyDto, UpdateSocietyDto, DeleteSocietyDto);
    }
}
