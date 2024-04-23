import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MESSAGE } from 'src/shared/mesages.enum';
import { SWAGGER } from 'src/shared/swagger.enum';

export class CreateTaskDto {
	@ApiProperty({ example: SWAGGER.TASK_TITLE_EXAMPLE, description: SWAGGER.TASK_TITLE_DESCRIPTION })
	@IsString({ message: MESSAGE.NO_TITLE })
	readonly title: string;

	@ApiProperty({ example: SWAGGER.TASK_DESCRIPTION_EXAMPLE, description: SWAGGER.TASK_DESCRIPTION_DESCRIPTION })
	@IsString()
	readonly description?: string;

	@ApiProperty({ example: SWAGGER.TASK_START_AT_EXAMPLE, description: SWAGGER.TASK_START_AT_DESCRIPTION })
	@IsString()
	readonly start_at: string;
}
