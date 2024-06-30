import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private _appService: AppService) {}

	@Get()
	checkBackendRunning() {
		return this._appService.checkBackendRunning();
	}
}
