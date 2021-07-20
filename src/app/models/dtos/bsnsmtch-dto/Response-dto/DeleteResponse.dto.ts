import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteResponseDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

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
}
