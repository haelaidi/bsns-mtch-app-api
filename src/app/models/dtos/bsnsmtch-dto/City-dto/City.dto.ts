import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CityDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idcountry: number;

  @IsOptional()
  @IsString()
  codepostal: string;

  @IsOptional()
  @IsString()
  label: string;

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