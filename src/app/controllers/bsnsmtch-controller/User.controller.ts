import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {UserService} from '../../services/bsnsmtch-service';
import {
    UserDto,
    CreateUserDto,
    UpdateUserDto,
    DeleteUserDto,
} from '../../models/dtos/bsnsmtch-dto';
import {UserEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController extends CrudReadWriteController<UserEntity, UserDto, CreateUserDto, UpdateUserDto, DeleteUserDto> {
    constructor(private readonly _serviceUser: UserService) {
        super(_serviceUser, UserDto, CreateUserDto, UpdateUserDto, DeleteUserDto);
    }
}
