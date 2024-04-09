import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this._usersService.create(body);
  }

  @Get('/getByEmail')
  async getUserByEmail(@Query() query: FindUserByEmailDto) {
    return await this._usersService.getUserByEmail(query.email);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this._usersService.getUserById(id);
  }

  @Get()
  async getAllUsers() {
    return await this._usersService.getAll();
  }
}
