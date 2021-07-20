import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteStatusDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;
}