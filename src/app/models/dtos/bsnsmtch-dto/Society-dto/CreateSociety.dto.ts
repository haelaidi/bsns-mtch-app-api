import {
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSocietyDto {

  @IsOptional()
  @IsNumber()
  idcity: number;


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

  @Transform(({ value }) => Number(value))
  @IsNumber()
  createdby: number;
}