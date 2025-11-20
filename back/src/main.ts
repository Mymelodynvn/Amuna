import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Amuna')
    .setDescription('Documentación de la API de Amuna')
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3002);
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT || 3002}`);
}
bootstrap();
