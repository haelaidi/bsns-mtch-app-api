import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteOfferDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idtypeoffer: number;

  @IsOptional()
  @IsNumber()
  iduser: number;

  @IsOptional()
  @IsNumber()
  idstatus: number;

  @IsOptional()
  @IsNumber()
  idcurrency: number;

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
}
