import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional, IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idtypeuser: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idsociety: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idfunction: number;

  @IsOptional()
  @IsString()
  pseudo: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  password: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsBoolean()
  enabled: boolean;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsDate()
  verifiedat: Date;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  createdby: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  updatedby: number;
}
