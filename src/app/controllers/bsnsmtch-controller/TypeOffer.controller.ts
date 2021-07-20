import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CrudReadWriteController} from "../crud-controller";
import {TypeOfferService} from "../../services/bsnsmtch-service";
import {
    TypeOfferDto,
    CreateTypeOfferDto,
    UpdateTypeOfferDto,
    DeleteTypeOfferDto
} from "../../models/dtos/bsnsmtch-dto";
import {TypeOfferEntity} from "../../models/entities/bsnsmtch-entity";
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags("TypeOffer")
@Controller("typeoffer")
export class TypeOfferController extends CrudReadWriteController<TypeOfferEntity, TypeOfferDto, CreateTypeOfferDto, UpdateTypeOfferDto, DeleteTypeOfferDto> {
    constructor(private readonly _serviceTypeOffer: TypeOfferService) {
        super(_serviceTypeOffer, TypeOfferDto, CreateTypeOfferDto, UpdateTypeOfferDto, DeleteTypeOfferDto);
    }
}
