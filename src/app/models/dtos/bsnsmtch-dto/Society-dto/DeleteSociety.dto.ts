import {
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteSocietyDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idcity: number;

  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  adress: string;

  @IsOptional()
  @IsString()
  patente: string;

  @IsOptional()
  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsString()
  description: string;
}