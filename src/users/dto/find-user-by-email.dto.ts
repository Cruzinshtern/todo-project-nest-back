import { IsEmail, IsString } from 'class-validator';
import { MESSAGE } from 'src/shared/mesages.enum';

export class FindUserByEmailDto {
	@IsString({ message: MESSAGE.WRONG_STRING_FORMAT })
	@IsEmail({}, { message: MESSAGE.WRONG_EMAIL_FORMAT })
	readonly email: string;
}
