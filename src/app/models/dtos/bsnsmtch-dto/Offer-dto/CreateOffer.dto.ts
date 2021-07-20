import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOfferDto {

  @IsNumber()
  idtypeoffer: number;

  @IsNumber()
  iduser: number;

  @IsNumber()
  idstatus: number;

  @IsNumber()
  idcurrency: number;

  @IsNumber()
  idcity: number;

  @IsNumber()
  idunitmeasure: number;

  @IsOptional()
  @IsDate()
  dateoffer: Date;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageurl: string;

  @IsOptional()
  @IsNumber()
  qantity_min: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  validatedby: number;

  @IsOptional()
  @IsDate()
  validatedat: Date;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}
