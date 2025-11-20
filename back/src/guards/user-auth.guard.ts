import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

function ValidateRequest(request: Request): boolean{
  const token: string| undefined = request.headers['token'];
  return token === '12345';
}
@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('Esta es la request:', request);
    //return true;
    return ValidateRequest(request);
  }
}
