import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class VerifyDto {

  @IsNotEmpty()
  @IsString()
  id: string;

}
