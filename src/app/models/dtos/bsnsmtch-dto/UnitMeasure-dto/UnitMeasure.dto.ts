import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UnitMeasureDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idparent: number;

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
