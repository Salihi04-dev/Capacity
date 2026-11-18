import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { validateEnvironment } from './config/env.validation';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  validateEnvironment(process.env);
  app.useLogger(app.get(Logger));
  app.use(helmet());
  const origins = (process.env.CORS_ORIGINS ?? '').split(',').map((v) => v.trim()).filter(Boolean);
  app.enableCors({ origin: origins.length ? origins : false, credentials: true });
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: { enableImplicitConversion: true } }));
  const config = new DocumentBuilder().setTitle('CAPACITY API').setDescription('Generated implementation description. Not an approved product contract until reviewed.').setVersion('1').addServer('/api/v1').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });
  await app.listen(Number(process.env.PORT ?? 3000));
}
void bootstrap();
