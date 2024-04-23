import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { SWAGGER } from 'src/shared/swagger.enum';
import { TaskStatus } from 'src/shared/task-status.enum';
import { User } from 'src/users/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
	@ApiProperty({ example: SWAGGER.TASK_TITLE_EXAMPLE, description: SWAGGER.TASK_TITLE_DESCRIPTION })
	@Prop({ required: true, type: mongoose.Schema.Types.String })
	title: string;

	@ApiProperty({ example: SWAGGER.TASK_DESCRIPTION_EXAMPLE, description: SWAGGER.TASK_DESCRIPTION_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.String })
	description: string;

	@ApiProperty({ example: SWAGGER.TASK_STATUS_EXAMPLE, description: SWAGGER.TASK_STATUS_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.Number, enum: TaskStatus, default: TaskStatus.TODO })
	status: TaskStatus;

	@ApiProperty({ example: SWAGGER.TASK_CREATED_AT_EXAMPLE, description: SWAGGER.TASK_CREATED_AT_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.String })
	created_at: string;

	@ApiProperty({ example: SWAGGER.TASK_CREATED_AT_EXAMPLE, description: SWAGGER.TASK_CREATED_AT_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.String })
	start_at: string;

	@ApiProperty({ example: SWAGGER.TASK_CREATED_BY_EXAMPLE, description: SWAGGER.TASK_CREATED_BY_DESCRIPTION })
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	created_by: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
