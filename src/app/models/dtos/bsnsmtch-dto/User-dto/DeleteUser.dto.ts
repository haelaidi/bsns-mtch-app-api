import {
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteUserDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idtypeuser: number;

  @IsOptional()
  @IsNumber()
  idsociety: number;

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
}