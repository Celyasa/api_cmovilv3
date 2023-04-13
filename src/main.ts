import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/cmovilv3');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Cmovil V3')
    .setDescription('Endpoints para el Cmovil V3')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document),
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    };
  await app.listen(AppModule.port);
}
bootstrap();
