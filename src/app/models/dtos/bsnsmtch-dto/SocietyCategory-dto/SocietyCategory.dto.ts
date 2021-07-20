import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SocietyCategoryDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idsociety: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcategory: number;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  createdby: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  updatedby: number;
}