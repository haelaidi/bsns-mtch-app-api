import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCountryDto {

  @IsOptional()
  @IsNumber()
  idtypecurrency: number;

  @IsOptional()
  @IsString()
  codegsm: string;

  @IsString()
  label: string;

  @IsString()
  flag: string;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}
