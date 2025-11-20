import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/enum/roles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    // si no hay roles requeridos, permitir acceso (no es endpoint protegido por roles)
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    if (!payload || !payload.role) {
      throw new ForbiddenException('No tienes permisos para acceder a este contenido');
    }

    // soportar role como string o array
    const userRoles: Roles[] = Array.isArray(payload.role) ? payload.role : [payload.role];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a este contenido');
    }
    return true;
  }
}