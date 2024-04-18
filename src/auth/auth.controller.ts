import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private _authService: AuthService) {}

	@Post('login')
	async login(@Body() body: SigninUserDto) {
		return await this._authService.login(body);
	}
}
