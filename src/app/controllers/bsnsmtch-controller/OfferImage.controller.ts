import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {OfferImageService} from '../../services/bsnsmtch-service';
import {
    OfferImageDto,
    CreateOfferImageDto,
    UpdateOfferImageDto,
    DeleteOfferImageDto,
} from '../../models/dtos/bsnsmtch-dto';
import {OfferImageEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('OfferImage')
@Controller('offerimage')
export class OfferImageController extends CrudReadWriteController<OfferImageEntity, OfferImageDto, CreateOfferImageDto, UpdateOfferImageDto, DeleteOfferImageDto> {
    constructor(private readonly _serviceOfferImage: OfferImageService) {
        super(_serviceOfferImage, OfferImageDto, CreateOfferImageDto, UpdateOfferImageDto, DeleteOfferImageDto);
    }
}
