import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TasksModule, UsersModule, AuthModule], // Importing TasksModule to manage task-related functionalities
  controllers: [AppController], // Registering AppController to handle incoming requests
  providers: [AppService], // Providing AppService for application-wide services
})
export class AppModule {}
