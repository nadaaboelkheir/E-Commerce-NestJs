import { Body, Controller, Param } from '@nestjs/common';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { CreateUser } from './DTO/createUser.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private _ConfigService: ConfigService,
  ) {}
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this._usersService.findOne(id);
  }
  @Get()
  getAllUsers() {
    return this._usersService.findAll();
  }
  @Post()
  createUser(@Body() user: CreateUser) {
    return this._usersService.create(user);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: CreateUser) {
    return this._usersService.update(id, user);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this._usersService.delete(id);
  }
}
