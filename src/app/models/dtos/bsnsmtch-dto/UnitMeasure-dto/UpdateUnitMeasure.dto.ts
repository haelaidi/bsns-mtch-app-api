import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUnitMeasureDto {

  @IsOptional()
  @IsNumber()
  idparent: number;

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  updatedby: number;
}
