import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional, IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { OfferImageDto } from '../OfferImage-dto';

export class OfferSearchDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idtypeoffer: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idstatus: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcategory: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idproduct: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcity: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcountry: number;

}
