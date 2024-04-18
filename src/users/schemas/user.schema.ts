import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { SWAGGER } from 'src/shared/swagger.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@ApiProperty({ example: SWAGGER.USER_FIRST_NAME_EXAMPLE, description: SWAGGER.USER_FIRST_NAME_DESCRIPTION })
	@Prop({ required: true, type: mongoose.Schema.Types.String })
	firstName: string;

	@ApiProperty({ example: SWAGGER.USER_LAST_NAME_EXAMPLE, description: SWAGGER.USER_LAST_NAME_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.String })
	lastName: string;

	@ApiProperty({ example: SWAGGER.USER_EMAIL_EXAMPLE, description: SWAGGER.USER_EMAIL_DESCRIPTION })
	@Prop({ index: true, unique: true, required: true })
	email: string;

	@ApiProperty({ example: SWAGGER.USER_PASSWORD_EXAMPLE, description: SWAGGER.USER_PASSWORD_DESCRIPTION })
	@Prop({ required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
