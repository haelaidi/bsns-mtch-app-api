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

export class CreateProductDto {


  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({value}) => Number(value))
  @IsNumber()
  createdby: number;
}