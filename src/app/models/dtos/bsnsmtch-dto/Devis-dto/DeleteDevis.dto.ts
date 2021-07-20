import {
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteDevisDto {

  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  idoffer: number;

  @IsOptional()
  @IsNumber()
  idbuyer: number;

  @IsOptional()
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
}