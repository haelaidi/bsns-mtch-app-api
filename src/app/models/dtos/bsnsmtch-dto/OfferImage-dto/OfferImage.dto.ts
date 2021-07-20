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

export class OfferImageDto {

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  idoffer: number;

  @IsOptional()
  @IsString()
  imageurl: string;

  @IsOptional()
  @IsString()
  image: string;

  @Transform(({value}) => Number(value))
  @IsOptional()
  @IsNumber()
  order: number;

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