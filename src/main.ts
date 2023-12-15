import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/cmovilv3');

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.use(
  //   cors({
  //     origin: 'http://192.168.10.99:3000',
  //     credentials: true,
  //   }),
  // );

  const configSwagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Cmovil V3')
    .setDescription('Endpoints para el Cmovil V3')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document),
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    };
  app.enableCors({
    origin: 'http://192.168.171.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    // optionsSuccessStatus: 200,
  });
  await app.listen(AppModule.port);
}
bootstrap();
