import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {DevisService} from '../../services/bsnsmtch-service';
import {
    DevisDto,
    CreateDevisDto,
    UpdateDevisDto,
    DeleteDevisDto,
} from '../../models/dtos/bsnsmtch-dto';
import {DevisEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Devis')
@Controller('devis')
export class DevisController extends CrudReadWriteController<DevisEntity, DevisDto, CreateDevisDto, UpdateDevisDto, DeleteDevisDto> {
    constructor(private readonly _serviceDevis: DevisService) {
        super(_serviceDevis, DevisDto, CreateDevisDto, UpdateDevisDto, DeleteDevisDto);
    }
}
