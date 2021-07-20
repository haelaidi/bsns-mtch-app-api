import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CountryDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idtypecurrency: number;

  @IsOptional()
  @IsString()
  codegsm: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  flag: string;

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
