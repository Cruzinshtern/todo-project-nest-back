import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER } from './shared/swagger.enum';

async function bootstrap() {
	const PORT = process.env.PORT || process.env.DEFAULT_PORT;
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });

    app.enableCors({
        allowedHeaders:"*",
        origin: "*"
    });

	const config = new DocumentBuilder().setTitle(SWAGGER.TITLE).setDescription(SWAGGER.DESCRIPTION).setVersion(SWAGGER.VERSION).addTag(SWAGGER.TAG).build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(SWAGGER.PATH, app, document);

	await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();
