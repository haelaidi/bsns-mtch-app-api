import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteReviewDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  idoffer: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  iduser: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  description: string;
}