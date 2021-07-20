import {Controller, Get, Post, Body, Param, Req, Res, HttpStatus, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {ProductService} from '../../services/bsnsmtch-service';
import {
    ProductDto,
    CreateProductDto,
    UpdateProductDto,
    DeleteProductDto,
} from '../../models/dtos/bsnsmtch-dto';
import {ProductEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';
import {IApiResponse} from "../../../common/helpers/api-response/api-response.interface";

@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('product')
export class ProductController extends CrudReadWriteController<ProductEntity, ProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto> {
    constructor(private readonly _serviceProduct: ProductService) {
        super(_serviceProduct, ProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto);
    }

    @Get('category/:id')
    async _findByCategory(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
        try {
            const {id} = request.params;
            if (!id) {
                await this._onError('Params id requirs', new Error('Params id requirs'), HttpStatus.BAD_REQUEST);
            } else {
                const [data, count] = await this._serviceProduct._findByCategory(id);
                await this._onSuccess(data, count);
            }
        } catch (err) {
            await this._onError(err.message, err);
        }
        return await this.send(response);
    }
}
