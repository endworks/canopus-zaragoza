import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

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
  await app.listen(3001);
}
bootstrap();
