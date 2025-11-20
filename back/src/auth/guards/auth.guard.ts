import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('El token es requerido');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new BadRequestException('Configuración del servidor incorrecta');
    }

    try {
      // verifica el token; si expiró o es inválido, lanzará excepción
      const payload = this.jwtService.verify(token, { secret });
      // opcional: convertir iat/exp a Date (no necesario)
      if (payload?.exp) (payload as any).exp = new Date((payload as any).exp * 1000);
      if (payload?.iat) (payload as any).iat = new Date((payload as any).iat * 1000);

      // requiere que el payload tenga role/roles (igual que el profe)
      if (!payload.role && !payload.roles) {
        throw new UnauthorizedException('No tienes los permisos necesarios');
      }

      // adjunta el payload en request.user para que otros guards/controllers lo usen
      (request as any).user = payload;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('El token ha expirado');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido');
      }
      throw new UnauthorizedException('Error de autenticación');
    }
  }
}