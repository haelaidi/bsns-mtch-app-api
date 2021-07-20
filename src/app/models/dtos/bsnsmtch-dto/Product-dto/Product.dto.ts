import {
  IsNumber,
  IsNumberString,
  IsString,
  IsEmpty,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsOptional
} from "class-validator";
import { Transform } from "class-transformer";

export class ProductDto {

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  createdby: number;

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  updatedby: number;
}