import { IsEmail, IsString } from 'class-validator';

export class FindUserByEmailDto {
  @IsString({ message: 'Has to be a string' })
  @IsEmail({}, { message: 'Email format is incorrect' })
  readonly email: string;
}
