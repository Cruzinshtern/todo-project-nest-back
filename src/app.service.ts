import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    checkBackendRunning() {
        return 'Hello from the backend';
    }
}
