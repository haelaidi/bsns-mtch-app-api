import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {TypeUserService} from '../../services/bsnsmtch-service';
import {
    TypeUserDto,
    CreateTypeUserDto,
    UpdateTypeUserDto,
    DeleteTypeUserDto,
} from '../../models/dtos/bsnsmtch-dto';
import {TypeUserEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('TypeUser')
@Controller('typeuser')
export class TypeUserController extends CrudReadWriteController<TypeUserEntity, TypeUserDto, CreateTypeUserDto, UpdateTypeUserDto, DeleteTypeUserDto> {
    constructor(private readonly _serviceTypeUser: TypeUserService) {
        super(_serviceTypeUser, TypeUserDto, CreateTypeUserDto, UpdateTypeUserDto, DeleteTypeUserDto);
    }
}
