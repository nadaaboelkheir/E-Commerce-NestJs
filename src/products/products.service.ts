import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';
import { User } from 'src/schema/user.schema';
import { CreateProductDto } from './DTO/createProduct.dto';
import { UpdateProductDto } from './DTO/updateProduct.tdo';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(userId: string): Promise<CreateProductDto[]> {
    return await this.productModel
      .find({ User: userId })
      .populate('User', 'name email');
  }
  async findOne(productId: string, userId: string): Promise<CreateProductDto> {
    try {
      return await this.productModel
        .findById({ _id: productId, User: userId })
        .populate('User', 'name email');
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(
    product: CreateProductDto,
    userId: string,
  ): Promise<CreateProductDto> {
    try {
      const newProduct = new this.productModel({ ...product, User: userId });
      return await newProduct.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(
    userId: string,
    productId: string,
    product: UpdateProductDto,
  ): Promise<CreateProductDto> {
    return await this.productModel.findByIdAndUpdate(
      { _id: productId, User: userId },
      { ...product, User: userId },
      { new: true, runValidators: true },
    );
  }

  async delete(userId: string, productId: string) {
    await this.productModel.findByIdAndDelete({ User: userId, _id: productId });
    return `Product with id ${productId} has been deleted`;
  }
}
