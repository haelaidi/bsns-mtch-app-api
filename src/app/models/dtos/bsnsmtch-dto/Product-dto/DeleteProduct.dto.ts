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

export class DeleteProductDto {

  @Transform(({value}) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;
}