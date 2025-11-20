import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Esta ruta es la entrada principal a nuestro Back',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un mensaje de bienvenida',
    schema: {
      example: 'Bienvenido a Amuna',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
