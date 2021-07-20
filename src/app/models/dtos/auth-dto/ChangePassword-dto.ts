import {
  IsNumber,
  IsString,
  IsOptional, isNotEmpty, IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {

  @IsNotEmpty()
  @IsString()
  oldpassword: string;

  @IsNotEmpty()
  @IsString()
  newpassword: string;

}
