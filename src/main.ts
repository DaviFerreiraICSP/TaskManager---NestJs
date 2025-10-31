import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { ValidationPipe } from '@nestjs/common';

/* Start the NestJS application
- 'scr/app.modele.ts': Principal module of the application
- 'scr/app.controller.ts': Main controller handling incoming requests
- 'scr/app.service.ts': Service providing business logic
*/

/* Bootstrap function to initialize and start the application */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    transform: false, // Automatically transform payloads to be objects typed according to their DTO classes
  })); // Enable global pipes for validation and transformation
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();