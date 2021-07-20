import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteCurrencyDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  symbol : string;

  @IsOptional()
  @IsString()
  description: string;
}
