import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateDevisDto {

  @IsNumber()
  idoffer: number;

  @IsNumber()
  idbuyer: number;

  @IsNumber()
  idseller: number;

  @IsOptional()
  @IsNumber()
  idstatus: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  amount: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  updatedby: number;
}