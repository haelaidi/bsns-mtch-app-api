import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteCountryDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idtypecurrency: number;

  @IsOptional()
  @IsString()
  codegsm: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  flag: string;

  @IsOptional()
  @IsString()
  description: string;
}
