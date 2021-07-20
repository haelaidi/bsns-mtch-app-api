import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCurrencyDto {

  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}
