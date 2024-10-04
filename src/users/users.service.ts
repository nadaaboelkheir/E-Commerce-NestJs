import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async findAll(): Promise<CreateUser[]> {
    return await this.UserModel.find();
  }
  async findOne(id: string): Promise<CreateUser> {
    try {
      return await this.UserModel.findById(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async update(id: string, user: UpdateUser): Promise<CreateUser> {
    return await this.UserModel.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id: string) {
    await this.UserModel.findByIdAndDelete(id);
    return `User with id ${id} has been deleted`;
  }
  async create(user: CreateUser): Promise<CreateUser> {
    try {
      const createdUser = new this.UserModel(user);
      return createdUser.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
