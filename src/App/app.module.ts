import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [TasksModule, UsersModule, AuthModule], // Importing TasksModule to manage task-related functionalities
  controllers: [AppController], // Registering AppController to handle incoming requests
  providers: [AppService], 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }

}
