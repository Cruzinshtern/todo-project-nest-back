import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		// MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@basic-db.kbspaui.mongodb.net/${process.env.DB_NAME}`),
		// MongooseModule.forRoot(`mongodb://mongo:${process.env.DB_RAILWAY_HASH}@roundhouse.proxy.rlwy.net:53248`),
		MongooseModule.forRoot(`mongodb://localhost:27017/${process.env.DB_NAME}`),
		UsersModule,
		AuthModule,
		TasksModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
