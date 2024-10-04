import { IsString, IsNumber, Min, Max, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters.' })
  title: string;

  @IsString()
  @Length(10, 500, { message: 'Description must be between 10 and 500 characters.' })
  description: string;

  @IsString()
  @Length(2, 50, { message: 'Category must be between 2 and 50 characters.' })
  category: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number.' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Stock must be a positive number.' })
  stock: number;
}
