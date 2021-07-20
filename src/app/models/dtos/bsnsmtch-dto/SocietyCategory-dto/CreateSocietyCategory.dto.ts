import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSocietyCategoryDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  idsociety: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  idcategory: number;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}