import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CrudReadWriteController} from "../crud-controller";
import {SocietyCategoryService} from "../../services/bsnsmtch-service";
import {
    SocietyCategoryDto,
    CreateSocietyCategoryDto,
    UpdateSocietyCategoryDto,
    DeleteSocietyCategoryDto
} from "../../models/dtos/bsnsmtch-dto";
import {SocietyCategoryEntity} from "../../models/entities/bsnsmtch-entity";
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags("SocietyCategory")
@Controller("societycategory")
export class SocietyCategoryController extends CrudReadWriteController<SocietyCategoryEntity, SocietyCategoryDto, CreateSocietyCategoryDto, UpdateSocietyCategoryDto, DeleteSocietyCategoryDto> {
    constructor(private readonly _serviceSocietyCategory: SocietyCategoryService) {
        super(_serviceSocietyCategory, SocietyCategoryDto, CreateSocietyCategoryDto, UpdateSocietyCategoryDto, DeleteSocietyCategoryDto);
    }
}
