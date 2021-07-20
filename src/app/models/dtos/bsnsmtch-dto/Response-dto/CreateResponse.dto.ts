import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateResponseDto {

  @IsOptional()
  @IsNumber()
  idparent: number;

  @IsOptional()
  @IsNumber()
  idoffer: number;

  @IsOptional()
  @IsNumber()
  iduser: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}
