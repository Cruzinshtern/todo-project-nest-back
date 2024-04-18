import { IsEmail, IsString, Length } from 'class-validator';
import { MESSAGE } from 'src/shared/mesages.enum';

export class CreateUserDto {
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	readonly firstName: string;

	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	readonly lastName: string;

	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	@IsEmail({}, { message: MESSAGE.WRONG_EMAIL_FORMAT })
	readonly email: string;

	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	@Length(4, 16, {
		message: MESSAGE.WRONG_PASSWORD_FORMAT,
	})
	readonly password: string;
}
