import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as express from 'express';
import * as http from 'http';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(server),
//    { logger: loggerService },
  );

  const configService = app.get(ConfigService);
  const apiConfig = configService.apiConfig();

  app.enableCors();
  app.useStaticAssets(apiConfig.file_location);
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
      }),
  );

  await app.init();

  console.log(`=> api is running on evironment [production : ${apiConfig.production}] ...`);

  await http.createServer(server).listen(apiConfig.port, () => {
    console.log(`=> api with http in http://${apiConfig.host}:${apiConfig.port}`);
  });

}

bootstrap();
