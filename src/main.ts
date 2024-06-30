import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER } from './shared/swagger.enum';

async function bootstrap() {
	const PORT = process.env.PORT || process.env.DEFAULT_PORT;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: ['http://localhost:4200'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		credentials: true,
	});

	const config = new DocumentBuilder().setTitle(SWAGGER.TITLE).setDescription(SWAGGER.DESCRIPTION).setVersion(SWAGGER.VERSION).addTag(SWAGGER.TAG).build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(SWAGGER.PATH, app, document);

	await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();
