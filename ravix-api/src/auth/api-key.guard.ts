import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    const validApiKey = process.env.API_KEY;

    if (!validApiKey) {
      // Si el servidor no tiene configurada una clave, bloqueamos todo por seguridad.
      throw new UnauthorizedException('El servidor no tiene configurada una clave API.');
    }

    if (apiKey === validApiKey) {
      return true;
    }

    throw new UnauthorizedException('Clave API (x-api-key) inválida o ausente.');
  }
}
