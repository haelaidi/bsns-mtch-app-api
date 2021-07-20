import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DevisDto {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idoffer: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idbuyer: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idseller: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  idstatus: number;

  @IsOptional()
  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  quantity: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  price: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  amount: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  createdby: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  updatedby: number;
}