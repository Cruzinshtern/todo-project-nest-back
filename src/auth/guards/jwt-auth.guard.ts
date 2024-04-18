import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { MESSAGE } from 'src/shared/mesages.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private _jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const token = req.headers.authorization;
			if (!token) {
				throw new UnauthorizedException({ message: MESSAGE.USER_NOT_AUTHORIZED });
			}
			const user = this._jwtService.verify(token);
			req.user = user;
			return true;
		} catch (e) {
			throw new UnauthorizedException({ message: MESSAGE.USER_NOT_AUTHORIZED });
		}
	}
}
