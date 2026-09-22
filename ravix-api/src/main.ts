import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita las validaciones globales de DTOs usando class-validator
  app.useGlobalPipes(new ValidationPipe({
    whitelist: false, 
    forbidNonWhitelisted: false,
    transform: true
  }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API RAVIX Academy')
    .setDescription('Documentación interactiva de la Biblioteca de Tareas')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
