import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initExpress } from './initExpress';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = await initExpress();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  await app.listen(process.env.PORT as string);
}
bootstrap();
