import { IsBoolean } from 'class-validator';

export class UpdateFavStatusDto {
	@IsBoolean()
	readonly isFavorite: boolean;
}
