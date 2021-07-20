import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional, IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { OfferImageDto } from '../OfferImage-dto';

export class OfferDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idtypeoffer: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  iduser: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idstatus: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcurrency: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idunitmeasure: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcity: number;

  @IsOptional()
  @IsDate()
  dateoffer: Date;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageurl: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  qantity_min: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  price: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  validatedby: number;

  @IsOptional()
  @IsDate()
  validatedat: Date;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  createdby: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  updatedby: number;

  @IsOptional()
  @IsArray()
  _offerimages: OfferImageDto[];
}
