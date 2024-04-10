import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

xdescribe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		jest.useRealTimers();
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, ConfigModule.forRoot(), MongooseModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	}, 6000);
});
