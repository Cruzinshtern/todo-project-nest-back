import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'src/shared/swagger.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private _usersService: UsersService) {}

	@ApiOperation({ summary: SWAGGER.USER_CREATE })
	@ApiResponse({ status: 200, type: User })
	@Post('create')
	async create(@Body() body: CreateUserDto): Promise<any> {
		return await this._usersService.create(body);
	}

	@ApiOperation({ summary: SWAGGER.USER_GET_BY_EMAIL })
	@ApiResponse({ status: 200, type: User })
	@ApiResponse({ status: 404, description: SWAGGER.USER_NOT_FOUND })
	@Get('/getByEmail')
	async getUserByEmail(@Query() query: FindUserByEmailDto) {
		return await this._usersService.getUserByEmail(query.email);
	}

	@ApiOperation({ summary: SWAGGER.USER_GET_BY_ID })
	@ApiResponse({ status: 200, type: User })
	@ApiResponse({ status: 404, description: SWAGGER.USER_NOT_FOUND })
	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return await this._usersService.getUserById(id);
	}

	@ApiOperation({ summary: SWAGGER.USER_GET_ALL })
	@ApiResponse({ status: 200, type: User, isArray: true })
	@Get()
	async getAllUsers() {
		return await this._usersService.getAll();
	}
}
