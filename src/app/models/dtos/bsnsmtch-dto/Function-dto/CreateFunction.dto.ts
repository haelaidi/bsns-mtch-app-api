import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateFunctionDto {

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}