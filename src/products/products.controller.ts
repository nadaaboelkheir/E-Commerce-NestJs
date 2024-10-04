import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './DTO/createProduct.dto';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly _productsService: ProductsService,
    private _ConfigService: ConfigService,
  ) {}
  @Get(':userId/:productId')
  getProductById(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return this._productsService.findOne(productId, userId);
  }

  @Post(':userId')
  createProduct(@Body() product: CreateProductDto, @Param('userId') userId: string) {
    return this._productsService.create(product, userId);
  }
  @Get(':userId')
  getAllProducts(@Param('userId') userId: string) {
    return this._productsService.findAll(userId);
  }
  @Patch(':userId/:productId')
  updateProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() product: CreateProductDto,
  ) {
    return this._productsService.update(userId, productId, product);
  }
  @Delete(':userId/:productId')
  deleteProduct(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this._productsService.delete(userId, productId);
  }
}
