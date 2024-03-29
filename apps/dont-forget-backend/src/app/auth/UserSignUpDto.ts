import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class userSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(120)
  password: string;

  @IsString()
  username: string;
}
