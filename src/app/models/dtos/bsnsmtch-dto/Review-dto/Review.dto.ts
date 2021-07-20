import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ReviewDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idoffer: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  iduser: number;

  @IsOptional()
  @IsString()
  comment: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  rating: number;

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