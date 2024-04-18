import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER } from 'src/shared/swagger.enum';

export class SigninResponseDto {
	@ApiProperty({ example: SWAGGER.SIGNIN_RESPONSE_EXAMPLE, description: SWAGGER.SIGNIN_RESPONSE_DESCRIPTION })
	readonly token: string;
}
