import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  stock: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  User: User;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
