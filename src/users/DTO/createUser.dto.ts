import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUser {
  @IsString()
  @Length(2, 10, { message: 'name must be between 2 and 10 characterss' })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  age: number;
}
