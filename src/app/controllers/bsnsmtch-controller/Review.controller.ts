import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {ReviewService} from '../../services/bsnsmtch-service';
import {
    ReviewDto,
    CreateReviewDto,
    UpdateReviewDto,
    DeleteReviewDto,
} from '../../models/dtos/bsnsmtch-dto';
import {ReviewEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {IApiResponse} from "../../../common/helpers/api-response/api-response.interface";

@UseGuards(JwtAuthGuard)
@ApiTags('Review')
@Controller('review')
export class ReviewController extends CrudReadWriteController<ReviewEntity, ReviewDto, CreateReviewDto, UpdateReviewDto, DeleteReviewDto> {
    constructor(private readonly _serviceReview: ReviewService) {
        super(_serviceReview, ReviewDto, CreateReviewDto, UpdateReviewDto, DeleteReviewDto);
    }

    @Post('upsert')
    async _upsert(request: any, response: any): Promise<IApiResponse> {
        const {user} = request;
        request.body['iduser'] = user.user.id;
        return super._upsert(request, response);
    }
}
