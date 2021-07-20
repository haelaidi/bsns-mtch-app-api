import {
  IsNumber,
  IsString,
  IsOptional, isNotEmpty, IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SingupDto {

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  idtypeuser: string;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  idcategory: string;

  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsNumber()
  idfunction: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  raison_social: string;
}
