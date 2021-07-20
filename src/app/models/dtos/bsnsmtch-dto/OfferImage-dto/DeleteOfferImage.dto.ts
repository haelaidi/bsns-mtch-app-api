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

export class DeleteOfferImageDto {

  @Transform(({value}) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idoffer: number;

  @IsOptional()
  @IsString()
  imageurl: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  description: string;
}