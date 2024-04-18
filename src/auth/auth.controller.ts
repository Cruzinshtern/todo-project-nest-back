import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MESSAGE } from 'src/shared/mesages.enum';
import { SWAGGER } from 'src/shared/swagger.enum';
import { AuthService } from './auth.service';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { SigninUserDto } from './dtos/signin-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private _authService: AuthService) {}

	@ApiOperation({ summary: SWAGGER.SIGNIN_SUMMARY })
	@ApiResponse({ status: 200, type: SigninResponseDto })
	@ApiResponse({ status: 401, description: MESSAGE.USER_NOT_AUTHORIZED })
	@Post('login')
	async login(@Body() body: SigninUserDto) {
		return await this._authService.login(body);
	}
}
