import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CrudReadWriteController} from '../crud-controller';
import {CategoryService} from '../../services/bsnsmtch-service';
import {
    CategoryDto,
    CreateCategoryDto,
    UpdateCategoryDto,
    DeleteCategoryDto,
} from '../../models/dtos/bsnsmtch-dto';
import {CategoryEntity} from '../../models/entities/bsnsmtch-entity';
import {JwtAuthGuard} from '../../../common/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController extends CrudReadWriteController<CategoryEntity, CategoryDto, CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto> {
    constructor(private readonly _serviceCategory: CategoryService) {
        super(_serviceCategory, CategoryDto, CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto);
    }
}
