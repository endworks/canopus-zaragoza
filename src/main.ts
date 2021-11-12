import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '0.0.0.0',
    port: 8877,
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Zaragoza')
    .setDescription('Zaragoza API')
    .setVersion(process.env.npm_package_version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
