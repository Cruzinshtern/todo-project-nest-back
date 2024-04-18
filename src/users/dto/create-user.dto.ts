import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { MESSAGE } from 'src/shared/mesages.enum';
import { SWAGGER } from 'src/shared/swagger.enum';

export class CreateUserDto {
	@ApiProperty({ example: SWAGGER.USER_FIRST_NAME_EXAMPLE, description: SWAGGER.USER_FIRST_NAME_DESCRIPTION })
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	readonly firstName: string;

	@ApiProperty({ example: SWAGGER.USER_LAST_NAME_EXAMPLE, description: SWAGGER.USER_LAST_NAME_DESCRIPTION })
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	readonly lastName: string;

	@ApiProperty({ example: SWAGGER.USER_EMAIL_EXAMPLE, description: SWAGGER.USER_EMAIL_DESCRIPTION })
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	@IsEmail({}, { message: MESSAGE.WRONG_EMAIL_FORMAT })
	readonly email: string;

	@ApiProperty({ example: SWAGGER.USER_PASSWORD_EXAMPLE, description: SWAGGER.USER_PASSWORD_DESCRIPTION })
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	@Length(4, 16, {
		message: MESSAGE.WRONG_PASSWORD_FORMAT,
	})
	readonly password: string;
}
