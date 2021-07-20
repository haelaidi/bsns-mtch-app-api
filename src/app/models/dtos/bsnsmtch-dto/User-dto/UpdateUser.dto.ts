import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {

  @IsNumber()
  idtypeuser: number;

  @IsNumber()
  idsociety: number;

  @IsOptional()
  @IsNumber()
  idfunction: number;

  @IsString()
  pseudo: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  enabled: number;

  @IsOptional()
  @IsNumber()
  verified: number;

  @IsOptional()
  @IsDate()
  verifiedat: Date;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  updatedby: number;
}