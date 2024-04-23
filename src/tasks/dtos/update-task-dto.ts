import { IsString } from 'class-validator';
import { MESSAGE } from 'src/shared/mesages.enum';

export class UpdateTaskDto {
	@IsString()
	readonly _id: string;

	@IsString({ message: MESSAGE.NO_TITLE })
	readonly title: string;

	@IsString()
	readonly description?: string;
}
