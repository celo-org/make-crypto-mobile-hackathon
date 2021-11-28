// (process.env as any)['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';
import {currencySaver} from './utils/currency'

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.set("data","new data") you can get this data in req.app.get('data)
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  currencySaver()
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // disableErrorMessages:
      //   process.env.NODE_ENV === 'PRODUCTION' ? true : false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Remox Back-end')
    .setDescription('Remox API description')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
