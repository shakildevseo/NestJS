import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const Port = process.env.PORT ?? 3000
  await app.listen(Port);
  console.log(`Server is running at http://localhost:${Port}`)
}
bootstrap();
