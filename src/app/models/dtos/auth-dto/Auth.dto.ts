import {
  IsNumber,
  IsString,
  IsOptional, isNotEmpty, IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}